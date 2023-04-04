using Bogus;

public static class Seeder
{
    public static Faker<Book> GetBookGenerator()
        => new Faker<Book>()
            .RuleFor(b => b.Id, f => Guid.NewGuid())
            .RuleFor(b => b.Title, f => f.Lorem.Sentence())
            .RuleFor(b => b.Author, f => GetAuthorGenerator());

    public static Faker<Author> GetAuthorGenerator()
        => new Faker<Author>()
            .RuleFor(a => a.Id, f => Guid.NewGuid())
            .RuleFor(a => a.FullName, f => f.Name.FullName());
}
