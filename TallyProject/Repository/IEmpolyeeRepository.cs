using TallyProject.Model;

namespace TallyProject.Repository
{
    public interface IEmpolyeeRepository
    {
        Task<List<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(int id);
        Task CreateAsync(Employee employee);
        Task UpdateAsync(Employee employee);
        Task DeleteAsync(Employee employee);
        Task<bool> EmployeeExists(int id);
    }
}
