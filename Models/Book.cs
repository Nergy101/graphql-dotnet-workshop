public class Book : IEntity
{
    public Guid Id { get; set; }

    public string? Title { get; set; }

    public Author? Author { get; set; }
}