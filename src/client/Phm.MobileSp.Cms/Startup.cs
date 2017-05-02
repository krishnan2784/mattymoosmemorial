using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Infrastructure.Repositories;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;

namespace Phm.MobileSp.Cms
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            if (env.IsDevelopment())
            {
                builder.AddApplicationInsightsSettings(developerMode: true);
            }
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<ITempDataProvider, CookieTempDataProvider>();

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
            
            services.AddSingleton<IMLearningCoreContract, MLearningCoreContractClient>();
            services.AddSingleton<ICoreContract, CoreContractClient>();

            services.AddSingleton<IApplicationUser, ApplicationUser>();

            services.AddSingleton<IBaseRequest, BaseRequest>();
            services.AddSingleton<IBaseCriteria, BaseCriteria>();
            
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IMarketRepository, MarketRepository>();
            services.AddTransient<IFeedRepository, FeedRepository>();
            
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(1);
                options.CookieName = ".MobileSP.Session";
                options.CookieHttpOnly = true;
            });
            services.AddApplicationInsightsTelemetry(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseSession();

            app.UseCookieAuthentication(new CookieAuthenticationOptions()
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
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });
			}
            else
            {
                //app.UseExceptionHandler("/Home/Error");
                app.UseErrorHandler(errorApp =>

 {

    // Normally you'd use MVC or similar to render a nice page.

    errorApp.Run(async context =>

   {

         context.Response.StatusCode = 500;

         context.Response.ContentType = "text/html";

         await context.Response.WriteAsync("<html><body>\r\n");

         await context.Response.WriteAsync("We're sorry, we encountered an un-expected issue with your application.<br>\r\n");

 

         var error = context.GetFeature<IErrorHandlerFeature>();

         if (error != null)

         {

            // This error would not normally be exposed to the client

            await context.Response.WriteAsync("<br>Error1: " + HtmlEncoder.Default.HtmlEncode(error.Error.Message) + "<br>\r\n");

         }

         await context.Response.WriteAsync("<br><a href=\"/\">Home</a><br>\r\n");

         await context.Response.WriteAsync("</body></html>\r\n");

         await context.Response.WriteAsync(new string(' ', 512)); // Padding for IE

    
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(name: "logout",template: "account/logout",
                    defaults: new { controller = "Base", action = "Logout" });

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
