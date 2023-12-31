import React from 'react'
import { useNavigate } from 'react-router-dom'

function Start1() {
    const navigate = useNavigate()
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage '>
            <div className='p-3 rounded w-25 border bg-gradient-success text-white text-center bg-white bg-opacity-75'>
                <h2 className='text-dark'>Login As</h2>
                <div className='d-flex justify-content-between mt-5'>
                    <button className='btn btn-primary btn-lg' onClick={e => navigate('/employeeLogin')}>Employee</button>
                    <button className='btn btn-success btn-lg' onClick={e => navigate('/login')}>Admin</button>
                </div>
            </div>
        </div>
  )
}

export default Start1