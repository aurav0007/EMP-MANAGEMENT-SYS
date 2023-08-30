import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

function Home() {
  // const data = [
  //   { email: 'user1@example.com' },
  //   { email: 'user2@example.com' },
  //   { email: 'user3@example.com' },
  // ];
  const { idd } = useParams();
  console.log(idd);
  const [items, setItems] = useState([]);
  const [adCount,setAdminCount] = useState();
  const [empCount,setempCount] = useState();
  const [salSum,setSalSum] = useState();
  const [expandedRow, setExpandedRow] = useState(null);

  const handleToggleExpand = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };
  const handleDelete = (id) => {
    if(id == idd)
    {
      alert("It can't be deleted");
    }
    else {
    axios.delete('http://localhost:8081/admindelete/'+id)
    .then(res => {
      if(res.data.Status === "Success")
      window.location.reload(true);
      else
      alert("Error in deleting admin");
    })
    .catch(err => console.log(err));
  }
 };


  useEffect(() =>{
    axios.get('http://localhost:8081/getadmininfo')
    .then(res => {
      if(res.data.Status === "Success") {
        console.log(res.data.Result)
      setItems(res.data.Result);
      }
    })
    .catch(err => console.log(err))
  },[])

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
            <h5>Total : <span className='text-danger'>{adCount}</span></h5>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shawdow-sm w-25">
          <div className="text-center pb-1">
            <h4>Employee</h4>
          </div>
          <hr></hr>
          <div className="">
            <h5>Total : <span className='text-danger'>{empCount}</span></h5>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 border shawdow-sm w-25">
          <div className="text-center pb-1">
            <h4>Salary</h4>
          </div>
          <hr></hr>
          <div className="">
            <h5>Total : <span className='text-danger'>{salSum}</span></h5>
          </div>
        </div>
      </div>

      
      {/* List of Admins */}
      <div className="mt-4 px-5 pt-3 d-flex flex-column justify-content-around align-content-center">
        <h5>List Of Admins</h5>
        <table className="table table-striped table-primary table-hover mt-3">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((items, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>{items.Name}</td>
                <td>{items.email}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleToggleExpand(index)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(items.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
              {expandedRow === index && (
                <tr>
                  <td colSpan="3">
                    <div className="expanded-row">
                      <p>Serial Number: {index + 1}</p>
                      <p>Email: {items.email}</p>
                      <p>Name: {items.Name}</p>
                      <p>Password: {items.password}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Home;
