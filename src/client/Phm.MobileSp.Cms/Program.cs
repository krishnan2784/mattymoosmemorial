// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Program.cs" company="Phm Group Ltd.">
//   2017
// </copyright>
// <summary>
//   The program.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Phm.MobileSp.Cms
{
    using System;
    using System.IO;

    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;

    /// <summary>
    /// The program.
    /// </summary>
    public class Program
    {
        /// <summary>
        /// The main.
        /// </summary>
        /// <param name="args">
        /// The args.
        /// </param>
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
                .AddCommandLine(args)
                .AddEnvironmentVariables(prefix: "ASPNETCORE_")
                .Build();

            var hostBuilder = new WebHostBuilder()
                .UseConfiguration(config)
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Phm.MobileSp.Cms.Startup>()
                .UseApplicationInsights();

            var regionName = Environment.GetEnvironmentVariable("REGION_NAME");
            if (regionName != null)
            {
                hostBuilder.UseAzureAppServices();
            }

            var host = hostBuilder.Build();

            host.Run();


            host.Run();
        }
    }
}
