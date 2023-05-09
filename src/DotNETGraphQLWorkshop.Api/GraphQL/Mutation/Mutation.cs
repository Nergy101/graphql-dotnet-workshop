using DotNETGraphQLWorkshop.Data;
using DotNETGraphQLWorkshop.Data.Entities;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace DotNETGraphQLWorkshop.API.GraphQL
{
    public class Mutation
    {
        public async Task<Book> AddBook(CreateBookInput book, [Service] DataContext context, [Service] ITopicEventSender sender)
        {
            var firstAuthor = context.Author.AsNoTracking().First();

            var newBook = new Book() { Title = book.Title, AuthorId = firstAuthor.Id };
            context.Books.Add(newBook);

            await context.SaveChangesAsync();
            await sender.SendAsync(nameof(Subscription.BookAdded), newBook);
            return newBook;
        }
    }

    public record CreateBookInput(string Title) { }
}
