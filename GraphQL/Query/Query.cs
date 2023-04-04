public class Query
{
    [UsePaging(IncludeTotalCount = true)]
    [UseFiltering]
    public IEnumerable<Book> GetBooks([Service] Repository<Book> bookRepository) => bookRepository.GetAll();

    public Book? GetBook([Service] Repository<Book> bookRepository, Guid id) => bookRepository.ReadById(id);

    [UsePaging(IncludeTotalCount = true)]
    [UseFiltering]
    public IEnumerable<Author> GetAuthors([Service] Repository<Author> authorRepository) => authorRepository.GetAll();

    public Author? GetAuthor([Service] Repository<Author> authorRepository, Guid id) => authorRepository.ReadById(id);
}
