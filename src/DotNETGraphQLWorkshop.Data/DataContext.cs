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

        public DbSet<Author> Authors { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>()
                .Navigation(e => e.Books)
                .AutoInclude();

            modelBuilder.Entity<Book>()
                .Navigation(b => b.Author)
                .AutoInclude();
        }
    }
}
