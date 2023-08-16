import React, { useEffect, useState  } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../CSS/Addemployee.css'
function EditEmployee() {
    const [data,setData] = useState({
        name : '',
        email: '',
        address : '',
        salary :'',
    
    })
    const navigate = useNavigate();
    
    const {id} = useParams();
    useEffect(()=>{
        axios.get('http://localhost:8081/get/'+id)
            .then(res => {
                setData({...data, name:res.data.Result[0].name,
                                email:res.data.Result[0].email,
                                address:res.data.Result[0].address,
                                salary:res.data.Result[0].salary})
            })
            .catch(err => console.log(err));
        },[])
    
    const handleSubmit = (event) => {
		event.preventDefault();
        //since we are not passing image we can avoid making this object formdata nand simply pass data
		// const formdata = new FormData();
		// formdata.append("name", data.name);
		// formdata.append("email", data.email);
		// formdata.append("address", data.address);
		// formdata.append("salary", data.salary);
		
		axios.put('http://localhost:8081/update/'+id, data)
		.then(res => {
           if(res.data.Status === "Success") {
            navigate('/employee')
           }
        })
		.catch(err => console.log(err));
	}

 return (

<div class="container mt-4 ">
<h3 className='p-1'>Update Employee Details</h3>
    <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <label for="name" class="form-label">Full Name</label>
            <input type="text" class="form-control" id="name" placeholder="Elon Musk" autoComplete='off'
            onChange={e => setData({...data,name:e.target.value})} value = {data.name}/>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com" autoComplete='off'
            onChange={e => setData({...data,email:e.target.value})} value = {data.email}/>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" autoComplete='off'
            onChange={e => setData({...data,password:e.target.value})} value="*******"/> 
        </div>
        <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <textarea class="form-control" id="address" rows="1" placeholder="Enter your address" autoComplete='off'
            onChange={e => setData({...data,address:e.target.value})} value= {data.address}/>
        </div>
        <div class="mb-3">
            <label for="salary" class="form-label">Salary</label>
            <textarea class="form-control" id="address" rows="1" placeholder="Enter your Salary" autoComplete='off'
            onChange={e => setData({...data,salary:e.target.value})} value = {data.salary} />
        </div>
        
        <button type="submit" class="btn btn-primary">Update</button>
    </form>
</div>
  )

 }
export default EditEmployee
