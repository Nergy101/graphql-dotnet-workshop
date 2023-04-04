using Bogus;

var builder = WebApplication.CreateBuilder(args);


var bookRepo = new Repository<Book>();
var authorRepo = new Repository<Author>();

var books = Seeder.GetBookGenerator().Generate(10);
var authors = books.Where(b => b.Author != null).Select(b => b.Author!);

bookRepo.AddRange(books);
authorRepo.AddRange(authors);

builder.Services.AddSingleton<Repository<Book>>(bookRepo);
builder.Services.AddSingleton<Repository<Author>>(authorRepo);

// Seed(builder.Services);

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddFiltering();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGraphQL();

app.Run();


void Seed(IServiceCollection servicesCollection)
{
    var services = servicesCollection.BuildServiceProvider();
    var bookRepo = services.GetRequiredService<Repository<Book>>();
    var authorRepo = services.GetRequiredService<Repository<Author>>();

    var books = Seeder.GetBookGenerator().Generate(10);
    var authors = books.Where(b => b.Author != null).Select(b => b.Author!);

    bookRepo.AddRange(books);
    authorRepo.AddRange(authors);
}

