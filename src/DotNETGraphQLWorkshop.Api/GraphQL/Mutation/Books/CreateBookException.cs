using System.Runtime.Serialization;

namespace DotNETGraphQLWorkshop.API.GraphQL.Mutation.Books
{
    [Serializable]
    public class CreateBookException : Exception
    {
        public CreateBookException()
            : base($"The book could not be created")
        {
        }

        public CreateBookException(string? message) : base(message)
        {
        }

        public CreateBookException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected CreateBookException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
