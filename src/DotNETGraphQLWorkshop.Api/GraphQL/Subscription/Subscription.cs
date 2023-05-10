using DotNETGraphQLWorkshop.Data.Entities;

namespace DotNETGraphQLWorkshop.API.GraphQL.Subscription
{
    public class Subscription
    {
        [Subscribe]
        public Book BookAdded([EventMessage] Book book) => book;

        [Subscribe]
        public Guid BookDeleted([EventMessage] Guid id) => id;
    }
}
