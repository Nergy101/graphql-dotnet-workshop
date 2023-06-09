using HotChocolate;

namespace DotNETGraphQLWorkshop.Data.Entities
{
    public class Book : IEntity
    {
        public Guid Id { get; set; }

        public string? Title { get; set; }

        [GraphQLIgnore]
        public Guid AuthorId { get; set; }

        public virtual Author? Author { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
