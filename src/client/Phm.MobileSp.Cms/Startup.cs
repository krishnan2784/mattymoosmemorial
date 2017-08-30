namespace Phm.MobileSp.Cms
{
    using Core.Models;
    using Core.Models.Interfaces;
    using Helpers;
    using Helpers.Attributes;
    using Infrastructure;
    using Infrastructure.Repositories;
    using Infrastructure.Repositories.Interfaces;
    using Microsoft.ApplicationInsights;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    using Microsoft.AspNetCore.SpaServices.Webpack;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;
    using MLearningCoreService;
    using MobileSPCoreService;
    using SecurityService;
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Net;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public class Startup
    {
        private const string ExceptionsOnStartup = "Startup";
        private const string ExceptionsOnConfigureServices = "ConfigureServices";
        private readonly Dictionary<string, List<Exception>> _exceptions;
        private TelemetryClient _client;
        public Startup(IHostingEnvironment env)
        {
          
            _exceptions = new Dictionary<string, List<Exception>>
            {
                { ExceptionsOnStartup, new List<Exception>() },
                { ExceptionsOnConfigureServices, new List<Exception>() },
            };

            try
            {
                var builder = new ConfigurationBuilder()
                       .SetBasePath(env.ContentRootPath)
                       .AddJsonFile("appsettings.json", true, true)
                       .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                       .AddJsonFile("config.json")
                       .AddEnvironmentVariables();
                if (env.IsDevelopment())
                {
                    builder.AddApplicationInsightsSettings(true);
                }
                Configuration = builder.Build();
            }
            catch (Exception ex)
            {
                _exceptions[ExceptionsOnStartup].Add(ex);
            }
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            try
            {
                services.AddSingleton<ITempDataProvider, CookieTempDataProvider>();
                services.AddNodeServices();
                services.AddMvc(options =>
                {
                    options.CacheProfiles.Add("NoCache",
                        new CacheProfile()
                        {
                            Location = ResponseCacheLocation.None,
                            NoStore = true
                        });

                    options.Filters.Add(new AiHandleErrorAttribute());
                });
                services.AddScoped<AiHandleErrorAttribute>();

                services.AddDistributedMemoryCache();

                services.AddSingleton(Configuration);
                services.Configure<ConnectionStrings>(Configuration.GetSection("ConnectionStrings"));
                services.Configure<MicrosoftAzureStorage>(Configuration.GetSection("MicrosoftAzureStorage"));

                AutoMapperConfiguration.SetConfiguration(ref services);

                services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

                services.AddScoped<IBaseRequest, BaseRequest>();
                services.AddScoped<IBaseCriteria, BaseCriteria>();
                services.AddScoped<IHttpClientService, MobileSPHttpClient>();

                services.AddTransient<IMLearningCoreContract, MLearningCoreContractClient>();
                services.AddTransient<ICoreContract, CoreContractClient>();
                services.AddTransient<ISecurityContract, SecurityContractClient>();

                services.AddTransient<IContentRepository, ContentRepository>();
                services.AddTransient<IFeedRepository, FeedRepository>();
                services.AddTransient<IFeedSummariesRepository, FeedSummariesRepository>();
                services.AddTransient<ILeaderBoardDataRepository, LeaderBoardDataRepository>();
                services.AddTransient<ILeaderBoardUserDataRepository, LeaderBoardUserDataRepository>();
                services.AddTransient<IMarketRepository, MarketRepository>();
                services.AddTransient<IMarketUserRepository, MarketUserRepository>();
                services.AddTransient<IMediaInfoRepository, MediaInfoRepository>();
                services.AddTransient<IMediaRepository, MediaRepository>();
                services.AddTransient<ISecurityGroupsRepository, SecurityGroupsRepository>();
                services.AddTransient<IUserConfigurationRepository, UserConfigurationRepository>();
                services.AddTransient<IUserQuizResultsRepository, UserQuizResultsRepository>();
                services.AddTransient<IUserRepository, UserRepository>();
                services.AddTransient<IUserTemplateRepository, UserTemplateRepository>();

                services.AddSession(options =>
                {
                    options.IdleTimeout = TimeSpan.FromHours(1);
                    options.CookieName = ".MobileSP.Session";
                    options.CookieHttpOnly = true;
                });
                services.AddApplicationInsightsTelemetry(Configuration);
            }
            catch (Exception ex)
            {
                _exceptions[ExceptionsOnConfigureServices].Add(ex);
               
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            var log = loggerFactory.CreateLogger<Startup>();

            app.UseSession();

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationScheme = "MobileSPAuthCookie",
                LoginPath = new PathString("/Account/Login"),
                AccessDeniedPath = new PathString("/Account/Login"),
                AutomaticAuthenticate = true,
                AutomaticChallenge = true
            });


            app.UseClaimsTransformation(context =>
            {
                if (context.Principal.Identity.IsAuthenticated)
                {
                    context.Principal.Identities.First().AddClaim(new Claim("now", DateTime.Now.ToString(CultureInfo.InvariantCulture)));
                }

                return Task.FromResult(context.Principal);
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseExceptionHandler("/Home/Error");
                app.UseDeveloperExceptionPage();
            }

#if DEBUG
            app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
            {
                HotModuleReplacement = true
            });
#endif

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute("logout", "account/logout",
                    new { controller = "Base", action = "Logout" });


                routes.MapRoute("logout-page", "logout",
                    new { controller = "Account", action = "Logout" });

                routes.MapRoute(
                    "default",
                    "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    "spa-fallback",
                    new { controller = "Home", action = "Index" });
            });

            if (!_exceptions.Any(p => p.Value.Any())) return;
            {
                _client = new TelemetryClient();
                foreach (var ex in _exceptions)
                {
                    foreach (var expection in ex.Value)
                    {
                        _client.TrackException(expection);
                    }
                }

                app.Run(
                    async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        context.Response.ContentType = "text/plain";

                        foreach (var ex in _exceptions)
                        {
                            foreach (var val in ex.Value)
                            {
                                log.LogError($"{ex.Key}:::{val.Message}");
                                await context.Response.WriteAsync($"Error on {ex.Key}: {val.Message}").ConfigureAwait(false);
                            }
                        }
                    });
            }
        }



    }
}
