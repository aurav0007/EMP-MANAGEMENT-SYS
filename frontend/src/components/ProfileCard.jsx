import React from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/ProfileCard.css';
import axios from 'axios';
function ProfileCard({employee}) {

  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error")
      }
      
    })
    .catch(err => console.log(err));
  }

  return (
    <div class="pprofile-card ">
      <div className='iimg_div'>

    <img
      src={`http://localhost:8081/imaged/` + employee.image}
      alt="Profile Image"
      class="pprofile-image"
      />
      </div>
    <div class="pprofile-content">
      <h3 class="mb-2">{employee.name}</h3>
      <hr></hr>
      <p>
        Email : <br></br> {employee.email}
       <br></br>
        Salary : <br></br> {employee.salary}
      </p>
    </div>
       <hr></hr>
    <div class="pprofile-buttons">
      <Link to={`/employeeEdit/` + employee.id} class="btn btn-primary btn-sm mr-2">Edit</Link>
      <button onClick={e => handleDelete(employee.id)} class="btn btn-danger btn-sm mx-2">Delete</button>
    </div>
  </div>

  )
}

export default ProfileCard
