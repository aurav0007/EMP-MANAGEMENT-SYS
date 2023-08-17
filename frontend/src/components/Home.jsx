import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Home() {
  const [adCount,setAdminCount] = useState();
  const [empCount,setempCount] = useState();
  const [salSum,setSalSum] = useState();
  useEffect(()=>{
    axios.get('http://localhost:8081/adminCount')
    .then(res => {
      setAdminCount(res.data[0].admin);
    })
    .catch(err => console.log(err))
  },[])

  useEffect(()=>{
    axios.get('http://localhost:8081/employeeCount')
    .then(res => {
      setempCount(res.data[0].employee);
    })
    .catch(err => console.log(err))
  },[])
  useEffect(() =>{
    axios.get('http://localhost:8081/sumSalary')
    .then(res =>{
      setSalSum(res.data[0].salary);
    })
  },[])
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shawdow-sm w-25">
          <div className="text-center pb-1">
            <h4>Admin</h4>
          </div>
          <hr></hr>
          <div className="">
            <h5>Total : {adCount}</h5>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shawdow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr></hr>
          <div className="">
            <h5>Total:{empCount}</h5>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shawdow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr></hr>
          <div className="">
            <h5>Total:{salSum}</h5>
          </div>
        </div>
      </div>
      {/* List of Admins */}
      <div className="mt-4 px-5 pt-3">
        <h5>List Of Admins</h5>
        <table className="table">
          <thead>
            <th>
              <th>Email</th>
              <th>Action</th>
            </th>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
