using Microsoft.EntityFrameworkCore;

namespace LIS.DataContext;

public class AppContext(DbContextOptions<AppContext> options) : DbContext(options), IAppContext
{
    public virtual DbSet<PersonModel> People { get; set; }
}