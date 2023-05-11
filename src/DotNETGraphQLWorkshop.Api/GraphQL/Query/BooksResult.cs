using DotNETGraphQLWorkshop.Data.Entities;

namespace DotNETGraphQLWorkshop.API.GraphQL.Query
{
    public class BooksResult
    {
        public IEnumerable<Book> Books { get; set; }
        public int Count { get; set; }
    }
}
