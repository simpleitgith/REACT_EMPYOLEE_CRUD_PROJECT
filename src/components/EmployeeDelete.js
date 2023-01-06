
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import './Delete.css'
import swal from 'sweetalert';

function EmployeeDelete() {
  const {id} = useParams();
  const [EmployeeName,setEmployeeName] = useState("");
  const [Band,setBand] = useState("");
  const [Role,setRole] = useState("");
  const [Designation,setDesignation] = useState("");
  const [Responsibilities,setResponsibilities] = useState("");
    const navigate=useNavigate();
    const [EmployeeID,setEmployeeID] = useState([]);
    useEffect(() => {
        
        axios.get("https://localhost:7298/api/Employees/" + id).then(response=>{
            console.log(response)
            setEmployeeID(response.data);
            setEmployeeName(response.data.EmployeName);
            setBand(response.data.Band);
            setRole(response.data.Role);
            setDesignation(response.data.Designation);
            setResponsibilities(response.data.Responsibilities);
            
        })
        .catch(error=>{console.log(error)})
      }, []);
    
    const handelDelete = (e)=>{

        e.preventDefault();
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete("https://localhost:7298/api/Employees/" + id).then((result)=>{
              console.log(result);navigate("/")
          }) 
          .catch(error=>console.log(error))
          } else {
            swal("Employee Not Deleted!");
          }
        });
        
       
    }
    
  return (
    
    <form >
      
      <div className="mb-3">
        <label htmlFor="employeeName" className="form-label">
          Name
        </label>
        <input
         disabled
          type="text"
          className="form-control"
          name="employeeName"
          
          value={EmployeeName}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="band" className="form-label">
          Band
        </label>
        <input
        disabled
          type="text"
          className="form-control"
          name="band"
          
          value={Band}
          
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
          
          value={Role}
          
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="designation" className="form-label">
          Designation
        </label>
        <input
        disabled
          type="text"
          className="form-control"
          name="designation"
          
          value={Designation}
          
        />
      </div>
      <div className="mb-3">
        <label htmlFor="responsibilities" className="form-label">
          Responsibilities
        </label>
        <input
        disabled
          type="text"
          className="form-control"
          name="responsibilities"
         
          value={Responsibilities}
          
        />
      </div>
      <div>
        <button  type="submit" onClick={handelDelete} className=" bttn1 btn btn-dark">
          {" "}
          Delete{" "}
        </button>
         <button className=" Canclebtn btn btn-dark" type="submit" onClick={()=> { navigate("/")}} >
          {" "}
          Cancle{" "}
        </button> 
        
      </div>
    </form>
  )
}
export default EmployeeDelete;
