import React from 'react'
import { Route , Routes } from 'react-router-dom'
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin'
import UserManage from './Pages/Admin/UserManage/UserManage'
import Home from './Pages/User/Home/Home'
import Login from './Pages/User/Login/Login'
import Profile from './Pages/User/Profile/Profile'
import Signup from './Pages/User/Signup/Signup'
function App() {

  return (
    <div>
      <Routes>
      <Route path='/admin' element={<AdminLogin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' exact element={<Home />} />
      <Route path='/profile' exact  element={<Profile />} />
      <Route path='/user-manage' exact element={<UserManage />} />
      </Routes>
    </div>
  )
}

export default App
