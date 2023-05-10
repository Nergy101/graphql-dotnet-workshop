using DotNETGraphQLWorkshop.Data;
using DotNETGraphQLWorkshop.Data.Entities;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;

namespace DotNETGraphQLWorkshop.API.GraphQL.Mutation.Books
{
    [ExtendObjectType(typeof(Mutation))]
    public class BookMutations
    {
        [Error(typeof(CreateBookException))]
        public async Task<Book> AddBook(CreateBookInput book, [Service] DataContext context, [Service] ITopicEventSender sender)
        {
            var author = await context.Authors.FirstOrDefaultAsync(a => a.Id == book.AuthorId)
                ?? throw new CreateBookException("Author could not be found");

            var newBook = new Book() { Title = book.Title, AuthorId = author.Id };

            await context.Books.AddAsync(newBook);

            await context.SaveChangesAsync();
            await sender.SendAsync(nameof(Subscription.Subscription.BookAdded), newBook);
            return newBook;
        }

        public async Task<Guid> DeleteBook(DeleteBookInput input, [Service] DataContext context, [Service] ITopicEventSender sender)
        {
            var book = await context.Books.FirstOrDefaultAsync(b => b.Id == input.Id);

            if (book == null) { return input.Id; }

            context.Remove(book);

            await context.SaveChangesAsync();
            await sender.SendAsync(nameof(Subscription.Subscription.BookDeleted), input.Id);
            return input.Id;
        }
    }
}
