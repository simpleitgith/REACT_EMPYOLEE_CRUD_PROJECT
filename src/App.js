import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import EmployeeList from  './components/EmployeeList';
import EmployeeUpdate from './components/EmployeeUpdate';
import EmployeeDelete from './components/EmployeeDelete';
import EmployeeCreate from './components/EmployeeCreate';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<EmployeeList/>}></Route>
      <Route path="/employeeUpdate/:id" element={<EmployeeUpdate/>}></Route>
      <Route path="/employeeDelete/:id" element={<EmployeeDelete/>}></Route>
      <Route path="/employeeCreate" element={<EmployeeCreate/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
