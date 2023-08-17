import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import axios from "axios";
// import { ProfileCard } from "./ProfileCard";

function Employee() {

   const [data,setData] = useState([]);
 
  useEffect(() => {
   axios.get('http://localhost:8081/getEmployee')
   .then(res => {
    if(res.data.Status === "Success") {
      setData(res.data.Result);
    }
   })
   .catch(err => console.log(err));
  },[])


  return (
    <div className="px-2 py-3">
      <div className="d-flex justify-content-center">
        <h4>Employee List</h4>
      </div>
      <div>
        <Link to="/create" className="btn btn-success mx-2">
          Add Employee
        </Link>
      </div>
      <div className="container mx-1 mt-1 row row-cols-1 row-cols-md-4 px-0">
      {data.map((employee, index) => (
         <div key={index} className="col px-1 mx-0 py-1 shadow">
        <ProfileCard key={index} employee={employee} />
        </div>
      ))}
    </div>
       
    
    </div>
  );
}

export default Employee;
