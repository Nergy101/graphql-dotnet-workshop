
using DotNETGraphQLWorkshop.Data.Entities;

namespace DotNETGraphQLWorkshop.Data.Repositories
{
    public interface IRepository<T> where T : class, IEntity
    {
        void Add(T entity);
        void AddRange(IEnumerable<T> entities);
        IQueryable<T> GetAll();
        T? ReadById(Guid id);
    }
}