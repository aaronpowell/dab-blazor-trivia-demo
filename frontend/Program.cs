using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using BlazorGraphQLTrivia;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });


builder.Services
    .AddTriviaClient()
    .ConfigureHttpClient(client =>
    {
        client.BaseAddress = new Uri($"{builder.HostEnvironment.BaseAddress}data-api/graphql/");
    });

await builder.Build().RunAsync();
