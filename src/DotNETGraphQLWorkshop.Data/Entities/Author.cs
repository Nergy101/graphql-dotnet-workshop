namespace DotNETGraphQLWorkshop.Data.Entities
{
    public class Author : IEntity
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }

        [IsProjected(true)]
        public ICollection<Book> Books { get; set; }

        public int GetBookCount()
            => Books.Count;
    }
}