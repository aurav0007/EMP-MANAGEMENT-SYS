import React from 'react'
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Employee from './components/Employee';
import Home from './components/Home';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';
import Start1 from './components/Start1';
import EmployeeDetail from './components/EmployeeDetail';
import EmployeeLogin from './components/EmployeeLogin';


function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path ='/' element={<Dashboard></Dashboard>}>
        <Route path ='/:idd' element ={<Home></Home>}></Route>
        <Route path = '/employee' element = {<Employee />}></Route>
        <Route path = '/profile' element = {<Profile />}></Route>
        <Route path = '/create' element = {<AddEmployee />}></Route>
        <Route path = '/employeeEdit/:id' element = {<EditEmployee />}></Route>

      </Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/start' element={<Start1></Start1>}></Route>
      <Route path='/employeelogin' element={<EmployeeLogin></EmployeeLogin>}></Route>
      <Route path='/employeedetail/:id' element={<EmployeeDetail></EmployeeDetail>}></Route>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
