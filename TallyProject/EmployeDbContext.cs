using Microsoft.EntityFrameworkCore;
using TallyProject.Model;

namespace TallyProject
{
    public class EmployeDbContext : DbContext
    {
        public EmployeDbContext(DbContextOptions<EmployeDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }

    }
}
