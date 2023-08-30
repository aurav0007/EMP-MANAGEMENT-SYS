import React, { useState } from 'react'
import '../CSS/login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        
        
})  

  // Navigate hook
  const navigate = useNavigate();
  //
  axios.defaults.withCredentials = true;
  //

const [error,setError] = useState('');
const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
    .then(res => {
        if(res.data.Status === 'Success') {
            navigate('/');
        } else {
            setError(res.data.Error);
        }
    })
    .catch(err => console.log(err));
}
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='bg-white p-3 rounded w-25 border loginForm'>
                 <div className='text-danger'>
                    {error && alert(error)}
                 </div>
                <h2 className='text-secondary text-center'>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3 text-dark' >
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                          onChange={e => setValues({...values, email:e.target.value})} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3 text-dark'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                         onChange={e => setValues({...values, password:e.target.value})} className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
                    <p className='text-dark text-center mt-1 p-1'>You are agree to our terms and policies</p>
                </form>
            </div>
        </div>
  )
}

export default Login
