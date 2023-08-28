import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmployeeProfileCard from "./EmployeeProfileCard"

function EmployeeDetail() {
  const{id} = useParams();
  const [employee,setemp] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8081/get/'+id)
    .then(res => setemp(res.data.Result[0]))
    .catch(err => console.log(err));
  })
  return (
    <div  className="col px-1 mx-0 py-1 shadow">
        <EmployeeProfileCard employee={employee} />
        </div>
  )
}

export default EmployeeDetail
