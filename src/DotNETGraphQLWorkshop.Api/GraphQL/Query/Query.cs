using DotNETGraphQLWorkshop.Data;
using DotNETGraphQLWorkshop.Data.Entities;
using DotNETGraphQLWorkshop.Data.Repositories;

namespace DotNETGraphQLWorkshop.API.GraphQL
{
    public class Query
    {
        [UsePaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Book> GetBooks2([Service] DataContext context) => context.Books;

        [UsePaging(IncludeTotalCount = true)]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Author> GetAuthors2([Service] DataContext context) => context.Author;

        public Book? GetBook([Service] IRepository<Book> bookRepository, Guid id) => bookRepository.ReadById(id);

        public Author? GetAuthor([Service] IRepository<Author> authorRepository, Guid id) => authorRepository.ReadById(id);

        [UsePaging(IncludeTotalCount = true)]
        [UseFiltering]
        public IEnumerable<Author> GetAuthors([Service] IRepository<Author> authorRepository) => authorRepository.GetAll();

        [UsePaging(IncludeTotalCount = true, MaxPageSize = 100)]
        [UseFiltering]
        public IEnumerable<Book> GetBooks([Service] IRepository<Book> bookRepository) => bookRepository.GetAll();
    }
}