using DotNETGraphQLWorkshop.Data.Entities;

namespace DotNETGraphQLWorkshop.API.GraphQL.Mutation.Authors
{
    public record CreateAuthorInput(string FullName, IEnumerable<Book>? Books) { }
    public record DeleteAuthorInput(Guid Id) { }
}
