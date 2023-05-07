using DbUp;
using DotNETGraphQLWorkshop.API.GraphQL;
using DotNETGraphQLWorkshop.Data;
using DotNETGraphQLWorkshop.Data.Entities;
using DotNETGraphQLWorkshop.Data.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

var mainFolder = typeof(Program).Assembly.Location;

builder.Services.AddDbContext<DataContext>(opts => opts.UseSqlite("Data Source=./demodatabase/demo.db"));
builder.Services.AddTransient<IRepository<Book>, Repository<Book>>();
builder.Services.AddTransient<IRepository<Author>, Repository<Author>>();

builder.Services
.AddCors(opts =>

    opts.AddPolicy(name: "custom",
                      policy =>
                      {
                          //policy.WithOrigins("http://localhost:4200");
                          policy.AllowAnyOrigin();
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                      })
    )
    .AddGraphQLServer()
    // Add Subscription support (WebSockets)
    // Integrate EF
    .RegisterDbContext<DataContext>()
    // Add Root GraphQL types
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>()
    // Add middlewares
    .AddFiltering()
    .AddProjections()
    .AddSorting()
    .AddInMemorySubscriptions();

builder.WebHost.UseUrls("http://localhost:64147/", "https://localhost:64148/");
var app = builder.Build();

app.UseRouting();
app.UseWebSockets();

ConfigureDatabase(app.Services);


//app.UseCors("custom");
app.UseCors(opts => opts.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.MapGet("/", () => "Hello GraphQL Demo!");

app.MapGraphQL();
app.MapGraphQLWebSocket();

app.Run();

void ConfigureDatabase(IServiceProvider services)
{
    using var scope = services.CreateScope();

    PrepareDatabase(scope.ServiceProvider);

    Seed(scope.ServiceProvider);
}

void PrepareDatabase(IServiceProvider services)
{
    var dbContext = services.GetRequiredService<DataContext>();
    dbContext.Database.EnsureDeleted();
    dbContext.Database.EnsureCreated();

    var upgrader = DeployChanges.To
            .SQLiteDatabase(dbContext.Database.GetConnectionString())
            .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
            .LogToConsole()
            .Build();

    var result = upgrader.PerformUpgrade();

    if (!result.Successful)
    {
        throw new Exception(result.ErrorScript.Name, result.Error);
    }
}

void Seed(IServiceProvider services)
{
    var authorRepo = services.GetRequiredService<IRepository<Author>>();

    var generatedEntities = Seeder.GetAuthorGenerator().Generate(1000);

    authorRepo.AddRange(generatedEntities);
}


