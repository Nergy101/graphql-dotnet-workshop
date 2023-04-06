
using HotChocolate;

namespace DotNETGraphQLWorkshop.Data.Entities
{
    public class Book : IEntity
    {
        public Guid Id { get; set; }

        public string? Title { get; set; }


        [GraphQLIgnore]
        public Guid AuthorId { get; set; }
        public Author? Author { get; set; }
    }
}