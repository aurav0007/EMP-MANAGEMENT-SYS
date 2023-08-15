import React, { useState } from 'react'
import axios from 'axios'
import '../CSS/Addemployee.css'
function AddEmployee() {
    const [data,setData] = useState({
        name : '',
        email: '',
        password: '',
        address : '',
        image : ''
    })

    const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("name", data.name);
		formdata.append("email", data.email);
		formdata.append("password", data.password);
		formdata.append("address", data.address);
		formdata.append("salary", data.salary);
		formdata.append("image", data.image);
		axios.post('http://localhost:8081/create', formdata)
		.then(res => console.log("Gaurav"))
		.catch(err => console.log(err));
	}

 return (

<div class="container mt-4 ">
    <form onSubmit={handleSubmit}>
        <div class="mb-3">
            <label for="name" class="form-label">Full Name</label>
            <input type="text" class="form-control" id="name" placeholder="Elon Musk" autoComplete='off'
            onChange={e => setData({...data,name:e.target.value})}/>
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="name@example.com" autoComplete='off'
            onChange={e => setData({...data,email:e.target.value})}/>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" autoComplete='off'
            onChange={e => setData({...data,password:e.target.value})}/> 
        </div>
        <div class="mb-3">
            <label for="address" class="form-label">Address</label>
            <textarea class="form-control" id="address" rows="1" placeholder="Enter your address" autoComplete='off'
            onChange={e => setData({...data,address:e.target.value})}/>
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Select an image</label>
            <input type="file" class="form-control" id="image" 
            onChange={e => setData({...data,image:e.target.files[0]})}/>
        </div>
        <button type="submit" class="btn btn-primary">Add</button>
    </form>
</div>
  )
}

export default AddEmployee
