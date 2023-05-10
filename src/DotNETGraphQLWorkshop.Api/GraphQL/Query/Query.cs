using DotNETGraphQLWorkshop.Data;
using DotNETGraphQLWorkshop.Data.Entities;
using DotNETGraphQLWorkshop.Data.Repositories;

namespace DotNETGraphQLWorkshop.API.GraphQL.Query
{
    public class BooksResult
    {
        public IEnumerable<Book> Books { get; set; }
        public int Count { get; set; }
    }

    public class Query
    {
        [UseSorting]
        public BooksResult GetBooks3([Service] DataContext context, CustomBookFilter filter)
        {
            var books = context.Books
                .Skip(filter.Skip)
                .Take(filter.Take)
                .Where(b => b.Title != null && b.Title.Contains(filter.TitleContains));

            var result = new BooksResult { Books = books, Count = books.Count() };

            return result;
        }

        [UsePaging(IncludeTotalCount = true, MaxPageSize = 5)]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<Book> GetBooks2([Service] DataContext context) => context.Books;

        [UsePaging(IncludeTotalCount = true, MaxPageSize = 5)]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<Book> GetBooks([Service] IRepository<Book> bookRepository) => bookRepository.GetAll();

        [UsePaging(IncludeTotalCount = true, MaxPageSize = 5)]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<Author> GetAuthors2([Service] DataContext context) => context.Authors;

        [UsePaging(IncludeTotalCount = true, MaxPageSize = 5)]
        [UseFiltering]
        [UseSorting]
        public IEnumerable<Author> GetAuthors([Service] IRepository<Author> authorRepository) => authorRepository.GetAll();

        public Book? GetBook([Service] IRepository<Book> bookRepository, Guid id) => bookRepository.ReadById(id);

        public Author? GetAuthor([Service] IRepository<Author> authorRepository, Guid id) => authorRepository.ReadById(id);
    }
}
