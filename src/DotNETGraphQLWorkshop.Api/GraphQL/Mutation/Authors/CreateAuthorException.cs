using System.Runtime.Serialization;

namespace DotNETGraphQLWorkshop.API.GraphQL.Mutation.Authors
{
    [Serializable]
    public class CreateAuthorException : Exception
    {
        public CreateAuthorException()
            : base($"This author could not be created")
        {
        }

        public CreateAuthorException(string? message) : base(message)
        {
        }

        public CreateAuthorException(string? message, Exception? innerException) : base(message, innerException)
        {
        }

        protected CreateAuthorException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
