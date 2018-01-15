using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using AspCoreServer.Data;
using Microsoft.ApplicationInsights;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Phm.MobileSp.Cms.Contracts;
using Phm.MobileSp.Cms.Core.Models;
using Phm.MobileSp.Cms.Core.Models.Interfaces;
using Phm.MobileSp.Cms.Helpers;
using Phm.MobileSp.Cms.Helpers.Attributes;
using Phm.MobileSp.Cms.Helpers.CustomModelBinding.FeedItems;
using Phm.MobileSp.Cms.Infrastructure;
using Phm.MobileSp.Cms.Infrastructure.Repositories;
using Phm.MobileSp.Cms.Infrastructure.Repositories.Interfaces;
using Swashbuckle.AspNetCore.Swagger;

namespace Phm.MobileSp.Cms
{
  public class Startup
  {
    private const string ExceptionsOnStartup = "Startup";
    private const string ExceptionsOnConfigureServices = "ConfigureServices";
    private readonly Dictionary<string, List<Exception>> _exceptions;
    private TelemetryClient _client = new TelemetryClient();

    public static void Main(string[] args)
    {
      try
      {
        var config = new ConfigurationBuilder()
          .AddCommandLine(args)
          .AddEnvironmentVariables("ASPNETCORE_")
          .Build();

        var hostBuilder = new WebHostBuilder()
          .UseConfiguration(config)
          .UseKestrel()
          .UseContentRoot(Directory.GetCurrentDirectory())
          .UseIISIntegration()
          .UseStartup<Startup>()
          .UseApplicationInsights()
          .CaptureStartupErrors(true);

        //var regionName = Environment.GetEnvironmentVariable("REGION_NAME");
        //if (regionName != null)
        //{
        hostBuilder.UseAzureAppServices();
        //}

        var host = hostBuilder.Build();

        host.Run();
      }
      catch (Exception ex)
      {
        var client = new TelemetryClient();
        client.TrackException(ex);
        throw;
      }
    }
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
        // Add framework services.
        services.AddSingleton<ITempDataProvider, CookieTempDataProvider>();
        services.AddNodeServices();
        services.AddDistributedMemoryCache();
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
        services.AddSingleton(Configuration);
        services.Configure<ConnectionStrings>(Configuration.GetSection("ConnectionStrings"));
        services.Configure<MicrosoftAzureStorage>(Configuration.GetSection("MicrosoftAzureStorage"));

        // AutoMapperConfiguration.SetConfiguration(ref services);


        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        services.AddScoped<IBaseRequest, BaseRequest>();
        services.AddScoped<IBaseCriteria, BaseCriteria>();
        services.AddScoped<IHttpClientService, MobileSPHttpClient>();
        
        services.AddTransient<IFeedRepository, FeedRepository>();
        services.AddTransient<IFeedSummariesRepository, FeedSummariesRepository>();
        services.AddTransient<ILeaderBoardDataRepository, LeaderBoardDataRepository>();
        services.AddTransient<ILeaderBoardUserDataRepository, LeaderBoardUserDataRepository>();
        services.AddTransient<IMarketRepository, MarketRepository>();
        services.AddTransient<IMarketUserRepository, MarketUserRepository>();
        services.AddTransient<IMediaInfoRepository, MediaInfoRepository>();
        services.AddTransient<IMediaRepository, MediaRepository>();
        services.AddTransient<IRegistrationRepository, RegistrationRepository>();
        services.AddTransient<ISecurityGroupsRepository, SecurityGroupsRepository>();
        services.AddTransient<ISecurityGroupUsersRepository, SecurityGroupUsersRepository>();
        services.AddTransient<IUserConfigurationRepository, UserConfigurationRepository>();
        services.AddTransient<IUserQuizResultsRepository, UserQuizResultsRepository>();
        services.AddTransient<IUserRepository, UserRepository>();
        services.AddTransient<IUserTemplateRepository, UserTemplateRepository>();
        services.AddTransient<IBrandingConfigurationsRepository, BrandingConfigurationsRepository>();
        services.AddTransient<ISecurityFeaturesRepository, SecurityFeaturesRepository>();
        services.AddTransient<ISecurityEntityFeaturesRepository, SecurityEntityFeaturesRepository>();
        services.AddTransient<ICompetitionRepository, CompetitionRepository>();
        services.AddTransient<ITermsAndConditionsRepository, TermsAndConditionsRepository>();
        services.AddTransient<IRewardSchemesRepository, RewardSchemesRepository>();
        services.AddTransient<ICompetitionSubsetRepository, CompetitionSubsetRepository>();
        services.AddTransient<IUserFeaturePermissionsRepository, UserFeaturePermissionsRepository>();

        services.AddSingleton<IFeedItemModelBinder, FeedItemModelBinder>();

        services.AddSession(options =>
        {
          options.IdleTimeout = TimeSpan.FromHours(1);
        });
        services.AddApplicationInsightsTelemetry(Configuration);

        //services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores();
        services.AddAuthentication("MobileSPAuthCookie")
                .AddCookie("MobileSPAuthCookie", options =>
                {
                  options.LoginPath = "/Account/Login";
                });

        //var connectionStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder { DataSource = "spa.db" };
        //var connectionString = connectionStringBuilder.ToString();
        //services.AddDbContext<SpaDbContext>(options =>
        //    options.UseSqlite(connectionString));

        // Register the Swagger generator, defining one or more Swagger documents
        services.AddSwaggerGen(c =>
        {
          c.SwaggerDoc("v1", new Info { Title = "mLearning CMS API", Version = "v1" });
        });
      }
      catch (Exception ex)
      {
        _exceptions[ExceptionsOnConfigureServices].Add(ex);
      }
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory) // SpaDbContext context
    {
      app.UseStaticFiles();
      app.UseStaticFiles(new StaticFileOptions()
      {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot", @"dist")),
        RequestPath = new PathString("/dist")
      });
      app.UseStaticFiles(new StaticFileOptions()
      {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"assets")),
        RequestPath = new PathString("/assets")
      });
      app.UseStaticFiles(new StaticFileOptions()
      {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"assets", @"images")),
        RequestPath = new PathString("/images")
      });
      app.UseStaticFiles(new StaticFileOptions()
      {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"css")),
        RequestPath = new PathString("/css")
      });
      app.UseStaticFiles(new StaticFileOptions()
      {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"node_modules", @"@angular", @"material", @"prebuilt-themes")),
        RequestPath = new PathString("/css")
      });
      app.UseStaticFiles(new StaticFileOptions()
      {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"scripts")),
        RequestPath = new PathString("/js")
      });

      app.UseSession();
      app.UseAuthentication();

      try
      {

        app.UseMvc(routes =>
        {
          routes.MapRoute("logout-page", "logout",
            new { controller = "CurrentUser", action = "Logout" });

          routes.MapRoute("register", "register",
            new { controller = "Registration", action = "Index" });

          routes.MapRoute(
            "default",
            "{controller=Home}/{action=Index}/{id?}");

          routes.MapSpaFallbackRoute(
            "spa-fallback",
            new { controller = "Home", action = "Index" });
        });

        if (env.IsDevelopment() || env?.EnvironmentName == "Debug" || env?.EnvironmentName == "Local")
        {
          app.UseDeveloperExceptionPage();
          app.UseBrowserLink();

          app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
          {
            HotModuleReplacement = true,
            HotModuleReplacementEndpoint = "/dist/__webpack_hmr"
          });
          app.UseSwagger();
          app.UseSwaggerUI(c =>
          {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "mLearning CMS API V1");
          });
          //// Enable middleware to serve swagger - ui(HTML, JS, CSS etc.), specifying the Swagger JSON endpoint.
          app.MapWhen(x => !x.Request.Path.Value.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase), builder =>
          {
            builder.UseMvc(routes =>
                      {
                        routes.MapSpaFallbackRoute(
                                      name: "spa-fallback",
                                      defaults: new { controller = "Home", action = "Index" });
                      });
          });
        }
        else
        {
          app.UseExceptionHandler("/Home/Error");
        }


      }
      catch (Exception ex)
      {
        _exceptions[ExceptionsOnConfigureServices].Add(ex);
      }

      if (!_exceptions.Any(p => p.Value.Any())) return;
      {
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

              try
              {
                loggerFactory.AddConsole(Configuration.GetSection("Logging"));
                loggerFactory.AddDebug();
                var log = loggerFactory.CreateLogger<Startup>();

                foreach (var ex in _exceptions)
                {
                  foreach (var val in ex.Value)
                  {

                    log.LogError($"{ex.Key}:::{val.Message}");
                    await context.Response.WriteAsync($"Error on {ex.Key}: {val.Message}").ConfigureAwait(false);
                  }
                }
              }
              catch (Exception ex)
              {
                _client.TrackException(ex);
              }
            });
      }
      
      // DbInitializer.Initialize(context);
    }
  }
}
