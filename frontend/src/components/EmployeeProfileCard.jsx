
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/EmployeeCard.css';
import axios from 'axios';

function EmployeeProfileCard({employee}) {
    const navigate = useNavigate();
    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            navigate('/start')
        }) 
        .catch(err =>console.log(err))
    }

  return (
    <div className='containerr'>

    <div class="profile-cardd bg-white">
      <div className='img_diiv mb-4'>

    <img
      src={`http://localhost:8081/imaged/` + employee.image}
      alt="Profile Image"
      class="profile-imagee"
      />
      </div>

      <div className="text-center mt-4 ">
            <h3 className="card-title">{employee.name}</h3>
        </div>
      <div className='profile-Des px-4 py-0  text-center'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore officiis, sint ad consequatur quam ex, quisquam voluptatum dignissimos repellat voluptas minus corrupti? Voluptas unde vel optio quidem modi labore praesentium, explicabo est sequi nostrum molestias, accusantium itaque, quisquam corporis? Unde.
      </div>
        <div className='profile-contentt'>
             
            <p className="card-text text-center"><strong>Email:</strong>{employee.email}</p>
            <p className="card-text text-center"><strong>Address:</strong>{employee.address}</p>
            <p className="card-text text-center"><strong>Salary:</strong>{employee.salary}</p>
        </div>

            <div className="d-flex justify-content-between profile-buttonss ">
            <Link to={`/employeeEditInDetail/` + employee.id} class="btn btn-primary">Edit</Link>
                <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            </div>
     
  </div>
</div>

    
  )
}

export default EmployeeProfileCard

