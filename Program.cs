using DotNETGraphQLWorkshop.Data;
using Microsoft.EntityFrameworkCore;
using DbUp;
using System.Reflection;
using DotNETGraphQLWorkshop.Data.Entities;
using DotNETGraphQLWorkshop.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

var mainFolder = typeof(Program).Assembly.Location;

var dbContextOptions = new DbContextOptionsBuilder<DataContext>().UseSqlite("Data Source=demo.db").Options;

builder.Services.AddDbContext<DataContext>(opts => opts.UseSqlite("Data Source=demodatabase/demo.db"));
builder.Services.AddTransient<IRepository<Book>, Repository<Book>>();
builder.Services.AddTransient<IRepository<Author>, Repository<Author>>();


builder.Services
    .AddGraphQLServer()
    .RegisterDbContext<DataContext>()
    .AddQueryType<Query>()
    //.AddType<AuthorType>()
    .AddFiltering()
    .AddProjections()
    .AddSorting();

var app = builder.Build();

ConfigureDatabase(app.Services);

app.MapGet("/", () => "Hello GraphQL Demo!");

app.MapGraphQL();

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