using Bogus;
using DotNETGraphQLWorkshop.Data.Entities;

namespace DotNETGraphQLWorkshop.Data
{
    public static class Seeder
    {
        public static int Seed { get; set; } = 1;

        public static Faker<Book> GetBookGenerator()
            => new Faker<Book>()
                .UseSeed(Seed)
                .RuleFor(b => b.Id, f => Guid.NewGuid())
                .RuleFor(b => b.Title, f => f.Hacker.Phrase());

        public static Faker<Author> GetAuthorGenerator()
            => new Faker<Author>()
                .UseSeed(Seed)
                .RuleFor(a => a.Id, f => Guid.NewGuid())
                .RuleFor(a => a.FullName, f => f.Name.FullName())
                .RuleFor(a => a.Books, f => GetBookGenerator().Generate(3).Take(new Random().Next(1, 10)).ToList());
    }
}
