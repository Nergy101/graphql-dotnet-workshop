namespace DotNETGraphQLWorkshop.API.GraphQL.Mutation.Books
{
    public record CreateBookInput(string Title, Guid AuthorId) { }
    public record DeleteBookInput(Guid Id) { }
}
