using DotNETGraphQLWorkshop.API.GraphQL.Mutation.Books;
using DotNETGraphQLWorkshop.Data;
using DotNETGraphQLWorkshop.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNETGraphQLWorkshop.API.GraphQL.Mutation.Authors
{
    [ExtendObjectType(typeof(Mutation))]
    public class AuthorMutations
    {
        [Error(typeof(CreateAuthorException))]
        public async Task<Author?> AddAuthor(string fullName, IList<CreateBookInput>? books, [Service] DataContext context)
        {
            var newAuthor = new Author() { FullName = fullName };
            await context.Authors.AddAsync(newAuthor);

            if (books is not null)
            {
                var bookEntities = new List<Book>();

                foreach (var book in books)
                {
                    bookEntities.Add(new Book() { AuthorId = newAuthor.Id, Title = book.Title });
                }

                await context.Books.AddRangeAsync(bookEntities);
            }
            else
            {
                throw new CreateAuthorException();
            }

            await context.SaveChangesAsync();
            return newAuthor;
        }

        public async Task<Guid> DeleteAuthor([ID] Guid id, [Service] DataContext context)
        {
            var author = await context.Authors.FirstOrDefaultAsync(b => b.Id == id);

            if (author == null) { return id; }

            context.Remove(author);

            await context.SaveChangesAsync();
            return id;
        }
    }
}
