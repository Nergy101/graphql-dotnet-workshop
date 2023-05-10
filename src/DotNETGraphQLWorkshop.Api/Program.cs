using DbUp;
using DotNETGraphQLWorkshop.API.GraphQL.Mutation;
using DotNETGraphQLWorkshop.API.GraphQL.Mutation.Authors;
using DotNETGraphQLWorkshop.API.GraphQL.Mutation.Books;
using DotNETGraphQLWorkshop.API.GraphQL.Query;
using DotNETGraphQLWorkshop.API.GraphQL.Subscription;
using DotNETGraphQLWorkshop.Data;
using DotNETGraphQLWorkshop.Data.Entities;
using DotNETGraphQLWorkshop.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

var mainFolder = typeof(Program).Assembly.Location;

builder.Services.AddDbContext<DataContext>(
    opts => opts.UseSqlite("Data Source=demodatabase/demo.db"));
builder.Services.AddTransient<IRepository<Book>, Repository<Book>>();
builder.Services.AddTransient<IRepository<Author>, Repository<Author>>();

builder.Services
.AddCors(opts =>

    opts.AddPolicy(name: "custom",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200");
                          policy.AllowAnyHeader();
                          policy.AllowAnyMethod();
                      })
    )
    .AddGraphQLServer()
    // Integrate EF
    //.AddDefaultTransactionScopeHandler()
    .RegisterDbContext<DataContext>()
    // Add GraphQL Conventions
    .AddMutationConventions(applyToAllMutations: true)
    // Add Root GraphQL types
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddSubscriptionType<Subscription>()
    // Add TypeExtensions
    .AddTypeExtension<AuthorMutations>()
    .AddTypeExtension<BookMutations>()
    // Add GraphQL types
    .AddFiltering()
    .AddProjections()
    .AddSorting()
    // Add Subscription support (WebSockets)
    .AddInMemorySubscriptions();

var app = builder.Build();

ConfigureDatabase(app.Services);

app.UseCors("custom");

app.UseWebSockets();
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    app.MapGet("/", (res) => { res.Response.Redirect("/graphql", true); return Task.CompletedTask; });
    app.MapGraphQLWebSocket();
    endpoints.MapGraphQL();
});

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
