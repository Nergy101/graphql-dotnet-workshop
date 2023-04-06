using DotNETGraphQLWorkshop.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace DotNETGraphQLWorkshop.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Author { get; set; }
    }
}