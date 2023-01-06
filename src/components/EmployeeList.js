
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import './List.css'

 function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [message, setMessage] = useState("")

    
        const navigate = useNavigate()
        const [getEmployee, setgetEmployee] = useState([])
        const [currentId, setCurrentId] = useState(0)
        
        
        const handleUpdate =(id)=>{
           navigate("/employeeUpdate/" +id)

        }

        const handleDelete =(id)=>{
            navigate("/employeeDelete/" +id)
 
         }
         const handleClick = () =>{
          setSearchTerm(message)
         }
      
         const handleChange = (event) =>{
          setMessage(event.target.value)
         }
        
        
          useEffect(() => {
            
            axios.get("https://localhost:7298/api/Employees").then(response=>{setgetEmployee(response.data)})
            .catch(error=>{console.log(error)})
          }, []);
  return (
     <div>
      <div className="timer">
        <Timer></Timer>
        </div>
    <div className="container text-center">
    
      
      <h1 className="super">Welcome to React Web API</h1>
      
        
      <div className="search">
      <input className="searchinput"  id="message" name="message" onChange={handleChange} value={message} type="text" placeholder="Search..." />
<button className="btnSearch" onClick={handleClick}>Search</button>
</div>
      
        <table className="table">
          <thead>
            <tr>

              <th scope="col">EmployeeId</th>
              <th scope="col">EmployeeName</th>
              <th scope="col">Band</th>
              <th scope="col">Role</th>
              <th scope="col">Designation</th>
              <th scope="col">Responsibilities</th>
             <th scope="col">Operations</th>
              
            </tr>
          </thead>
          <tbody>
            {getEmployee.filter((record)=>{
              if (searchTerm == "") {
                return record
              } else if (record.Designation.toLowerCase().includes(searchTerm.toLowerCase())) {
                 return record
              }
            }) .map((record, index) => {
              return (
                <tr key={index}>
                  <td>{record.EmployeeID}</td>
                  <td>{record.EmployeName}</td>
                  <td>{record.Band}</td>
                  <td>{record.Role}</td>
                  <td>{record.Designation}</td>
                  <td>{record.Responsibilities}</td>
                  <td>
                    
                     <a className="btn btn-primary" onClick={()=>{handleUpdate(record.EmployeeID)}} >Update</a>
                      <a className="btn btn-danger" onClick={()=>{handleDelete(record.EmployeeID)}}>Delete</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="cr">
        <Link className="btn btn-dark"  to="/employeeCreate">EmployeeCreate</Link>
        </div>
      </div>
      </div>
    
  
  )
}

export default EmployeeList;
