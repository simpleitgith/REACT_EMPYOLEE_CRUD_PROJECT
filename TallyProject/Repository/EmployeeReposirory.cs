using Microsoft.EntityFrameworkCore;
using TallyProject.Model;


namespace TallyProject.Repository
{
    public class EmployeeReposirory : IEmpolyeeRepository
    {
        private readonly EmployeDbContext _dbContext;
        public EmployeeReposirory(EmployeDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateAsync(Employee employee)
        {
            await _dbContext.Employees.AddAsync(employee);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Employee employee )
        {
            _dbContext.Employees.Remove(employee);
           await _dbContext.SaveChangesAsync();
           
        }

        

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _dbContext.Employees.ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _dbContext.Employees.Where(s => s.EmployeeID == id).FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(Employee employee)
        {
              _dbContext.Employees.Update(employee);
            await _dbContext.SaveChangesAsync();
        }
        public async Task<bool> EmployeeExists(int id)
        {
            return await _dbContext.Employees.AnyAsync(e => e.EmployeeID == id);
        }


    }
}
