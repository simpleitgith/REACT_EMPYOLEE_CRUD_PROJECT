import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Create.css'
import swal from 'sweetalert';

 function EmployeeCreate() {
    const [EmployeeName,setEmployeeName] = useState("");
    const [Band,setBand] = useState("");
    const [Role,setRole] = useState("");
    const [Designation,setDesignation] = useState("");
    const [Responsibilities,setResponsibilities] = useState("");
    const navigate=useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {EmployeName:EmployeeName, Band:Band,Role:Role,Designation:Designation,Responsibilities:Responsibilities}
        axios.post("https://localhost:7298/api/Employees", data).then((result)=>{
          swal({
            title: "Good job!",
            text: "Created Succesfully!",
            icon: "success",
            button: "Ok",
          });
            console.log(result.data);
        }).then((res)=>{navigate("/")})
        .catch(error=>console.log(error))
    }
    
    const handelReset = (e)=>{
      
      setEmployeeName("");
      setBand("");
      setRole("");
      setDesignation("");
      setResponsibilities("");
     }
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="employeeName" className="form-label">
          Name
        </label>
        <input
         required
          type="text"
          className="form-control"
          name="employeeName"
          placeholder="EmployeeName"
          value={EmployeeName}
          onChange={e=>setEmployeeName(e.target.value)}
          
        />
      </div>
      <div className="mb-3">
        <label htmlFor="band" className="form-label">
          Band
        </label>
        <input
        required
          type="text"
          className="form-control"
          name="band"
          placeholder="Band"
          value={Band}
          onChange={e=>setBand(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <input
          type="text"
          className="form-control"
          name="role"
          placeholder="Role"
          value={Role}
          onChange={e=>setRole(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="designation" className="form-label">
          Designation
        </label>
        <input
        required
          type="text"
          className="form-control"
          name="designation"
          placeholder="Designation"
          value={Designation}
          onChange={e=>setDesignation(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="responsibilities" className="form-label">
          Responsibilities
        </label>
        <input
        required
          type="text"
          className="form-control"
          name="responsibilities"
          placeholder="Responsibilities"
          value={Responsibilities}
          onChange={e=>setResponsibilities(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" className="dd btn btn-dark">
          {" "}
          Submit{" "}
        </button>
        <button type="reset" onClick={handelReset} className=" bttn btn btn-dark" >
          Reset
        </button>
      </div>
    </form>
  )
}
export default EmployeeCreate;
