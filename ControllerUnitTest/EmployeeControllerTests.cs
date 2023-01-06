using AutoFixture;
using Microsoft.AspNetCore.Mvc;
using Moq;
using TallyProject.Controllers;
using TallyProject.Model;
using TallyProject.Repository;

namespace ControllerUnitTest
{
    public class EmployeeControllerTests
    {
        private readonly EmployeesController _controller;
        private Fixture _fixture;
        private readonly Mock<IEmpolyeeRepository> _repoMock = new Mock<IEmpolyeeRepository>();
        public EmployeeControllerTests()
        {
            _controller = new EmployeesController(_repoMock.Object);
            _fixture = new Fixture();
        }

        

        [Fact]
        public async Task GetStudentById_InputId_GetSpecificStudent_UsingFixture()
        {
            //Arrange
            var employee = _fixture.Create<Employee>();
            _repoMock.Setup(repo => repo.GetByIdAsync(1)).ReturnsAsync(employee);

            //Act
            var actionResult = await _controller.GetEmployee(1);

            //Assert
            Assert.NotNull(actionResult);
            Assert.True(employee.EmployeeID == actionResult.Value.EmployeeID);
        }

        

        [Fact]
        public async Task Delete_Student_Return_Ok()
        {
            var employee = _fixture.Create<Employee>();
            _repoMock.Setup(repo => repo.GetByIdAsync(employee.EmployeeID)).ReturnsAsync(employee);

            var actionResult = await _controller.DeleteEmployee(employee.EmployeeID);

            var result = actionResult as ObjectResult;
            Assert.Equal(200, result.StatusCode);

        }

        [Fact]
        public async Task Post_Student_Return_BadRequest()
        {
            var employee = _fixture.Create<Employee>();
            _repoMock.Setup(repo => repo.CreateAsync(It.IsAny<Employee>())).Throws(new Exception());

            var actionResult = await _controller.CreateEmployee(employee);
            var result = actionResult.Result as ObjectResult;

            Assert.Equal(400, result.StatusCode);

        }


        [Fact]
        public async Task Get_Student_Return_Ok()
        {
            var employeeList = _fixture.CreateMany<Employee>(3).ToList();
            _repoMock.Setup(repo => repo.GetAllAsync()).ReturnsAsync(employeeList);

            var actionResult = await _controller.GetEmployees();

            Assert.True(employeeList[0].EmployeeID == actionResult.Value.First().EmployeeID);

        }

        [Fact]
        public async Task Put_Student_Return_NotFound()
        {
            var employee = _fixture.Create<Employee>();
            _repoMock.Setup(repo => repo.UpdateAsync(It.IsAny<Employee>())).Throws(new Exception());
            _repoMock.Setup(repo => repo.EmployeeExists(employee.EmployeeID)).ReturnsAsync(false);

            var actionResult = await _controller.PutEmployee(employee.EmployeeID, employee);
            var result = actionResult as NotFoundResult;

            Assert.Equal(404, result.StatusCode);
        }


    }
}
