namespace DotNETGraphQLWorkshop.Data.Entities
{
    public class Author : IEntity
    {
        public Guid Id { get; set; }
        public string? FullName { get; set; }

        public virtual ICollection<Book> Books { get; set; }

        public int GetBookCount() => Books.Count;
    }
}
