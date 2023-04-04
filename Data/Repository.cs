public class Repository<T> where T : IEntity
{
    List<T> Entities = new();

    public Repository()
    {
    }

    public void Add(T entity)
    {
        Entities.Add(entity);
    }

    public void AddRange(IEnumerable<T> entities)
    {
        Entities.AddRange(entities);
    }

    public IEnumerable<T> GetAll()
    {
        return Entities;
    }

    public T? ReadById(Guid id)
    {
        return Entities.Find(e => e.Id == id);
    }

}