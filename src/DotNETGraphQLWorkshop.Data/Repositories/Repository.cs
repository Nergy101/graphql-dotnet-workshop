
using DotNETGraphQLWorkshop.Data.Entities;

namespace DotNETGraphQLWorkshop.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : class, IEntity
    {
        private readonly DataContext _dataContext;

        public Repository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Add(T entity)
        {
            _dataContext.Set<T>().Add(entity);
            _dataContext.SaveChanges();
        }

        public void AddRange(IEnumerable<T> entities)
        {
            _dataContext.Set<T>().AddRange(entities);
            _dataContext.SaveChanges();
        }

        public IQueryable<T> GetAll()
        {
            return _dataContext.Set<T>().AsQueryable();
        }

        public T? ReadById(Guid id)
        {
            return _dataContext.Find<T>(id);
        }

    }
}