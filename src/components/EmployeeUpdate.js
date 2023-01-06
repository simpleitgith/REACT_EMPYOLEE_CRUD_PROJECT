

import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './Update.css'
import swal from 'sweetalert';



 function EmployeeUpdate() {
    const {id} = useParams();

   

    useEffect(() => {
        
        axios.get("https://localhost:7298/api/Employees/" + id).then(response=>{
            console.log(response)
            setEmployeeID(response.data.EmployeeID);
            setEmployeeName(response.data.EmployeName);
            setBand(response.data.Band);
            setRole(response.data.Role);
            setDesignation(response.data.Designation);
            setResponsibilities(response.data.Responsibilities);
        })
        .catch(error=>{console.log(error)})
      }, []);

    const [EmployeeID,setEmployeeID] = useState("");
    const [EmployeeName,setEmployeeName] = useState("");
    const [Band,setBand] = useState("");
    const [Role,setRole] = useState("");
    const [Designation,setDesignation] = useState("");
    const [Responsibilities,setResponsibilities] = useState("");
    const navigate=useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const updateData = {EmployeeID:EmployeeID, EmployeName:EmployeeName, Band:Band,Role:Role,Designation:Designation,Responsibilities:Responsibilities}
        axios.put("https://localhost:7298/api/Employees/" + EmployeeID,updateData).then((result)=>{
          swal({
            title: "Good job!",
            text: "Updated Succesfully!",
            icon: "success",
            button: "Ok",
          });
            console.log(result.data);navigate("/")
        }) 
        .catch(error=>console.log(error))
    }
     

  return (
    <form  onSubmit={handleSubmit} noValidate>
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
        <button type="submit" className="bttn1 btn btn-dark">
          {" "}
          Update{" "}
        </button>
        
         <button className=" Canclebtn btn btn-dark" type="submit" onClick={()=> { navigate("/")}} >
          {" "}
          Cancle{" "}
        </button> 
        
      </div>
    </form>
  )
}
export default EmployeeUpdate;
