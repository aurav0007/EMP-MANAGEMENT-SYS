import React from 'react'
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Employee from './components/Employee';
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard></Dashboard>}>
        <Route path ='' element ={<Home></Home>}></Route>
        <Route path = '/employee' element = {<Employee />}></Route>
        <Route path = '/profile' element = {<Profile />}></Route>
        <Route path = '/create' element = {<AddEmployee />}></Route>
        <Route path = '/employeeEdit/:id' element = {<EditEmployee />}></Route>

      </Route>
      <Route path='/login' element={<Login></Login>}></Route>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
