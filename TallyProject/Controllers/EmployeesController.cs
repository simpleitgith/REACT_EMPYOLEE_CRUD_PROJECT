using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;
using TallyProject;
using TallyProject.Model;
using TallyProject.Repository;

namespace TallyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmpolyeeRepository _repository;

        public EmployeesController(IEmpolyeeRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _repository.GetAllAsync();
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            return await _repository.GetByIdAsync(id);
            
        }

        // PUT: api/Employees/5
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {

            {
                
                if (id != employee.EmployeeID)
                {
                    return BadRequest();
                }
                try
                {
                    await _repository.UpdateAsync(employee);
                }
                catch (Exception ex)
                {
                    if (!await _repository.EmployeeExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        return BadRequest(ex);
                    }
                }
                return CreatedAtAction("GetEmployee", new { id = employee.EmployeeID }, employee);
            }

        }

        // POST: api/Employees
        
        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            try
            {
                await _repository.CreateAsync(employee);
                return CreatedAtAction("GetEmployee", new { id = employee.EmployeeID }, employee);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }

        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _repository.GetByIdAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

           await _repository.DeleteAsync(employee);

            return Ok("Employee Deleted");
        }

        
    }
}
