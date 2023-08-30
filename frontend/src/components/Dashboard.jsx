import React, { useEffect } from 'react'
import { Link, Outlet, useNavigate ,useParams} from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css'
import axios from 'axios';

function Dashboard() {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
 
    useEffect(() => {
    axios.get('http://localhost:8081/dashboard')
    .then(res => {
        if(res.data.Status === "Success" )
        {
            if(res.data.Role === "admin")
            {
             
                navigate('/'+1);
            }
            else {
                const id = res.data.id;
                navigate('/employeedetail/'+id);
            }

        } else
        {
            navigate('/start')
        }
    })
    },[])

    const handleLogout = () => {
        axios.get('http://localhost:8081/logout')
        .then(res => {
            navigate('/start')
        }) 
        .catch(err =>console.log(err))
    }
  return (
    <div class="container-fluid">
    <div class="row flex-nowrap">
        <div class="col-auto px-sm-3 px-0 bg-dark">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span class="fs-5 d-none d-sm-inline">Admin Dashboard</span>
                </a>
                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                   
                    <li>
                        <Link to="/" data-bs-toggle="collapse" class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                       
                    </li>
                    <li>
                        <Link to="employee" class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-table"></i> <span class="ms-1 d-none d-sm-inline">Manage Employees</span></Link>
                    </li>
                   
                       
                    <li>
                        <Link to="profile" class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-people"></i> <span class="ms-1 d-none d-sm-inline">Profile</span> </Link>
                    </li>
                    <li onClick={handleLogout}>
                        <a href="#" class="nav-link px-0 align-middle text-white">
                            <i class="fs-4 bi-power"></i> <span class="ms-1 d-none d-sm-inline">Logout</span> </a>
                    </li>
                </ul>
                
             </div>
         </div>
            <div class="col p-0 m-0">
                <div className='p-2 d-flex justify-content-center shadow'>
                    <h4>Employee Management System</h4>
                </div>
                <Outlet />
            </div>
        </div>
        
    </div>

  )
}

export default Dashboard
