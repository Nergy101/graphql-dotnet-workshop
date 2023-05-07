using DotNETGraphQLWorkshop.Data.Entities;
using HotChocolate.Subscriptions;

namespace DotNETGraphQLWorkshop.API.GraphQL
{
    public class Mutation
    {
        public async Task<Book> AddBook(Book book, [Service] ITopicEventSender sender)
        {
            // Omitted code for brevity

            await sender.SendAsync(nameof(Subscription.BookAdded), book);
            return book;
        }
    }
}
