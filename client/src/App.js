import React from 'react'
import { Route , Routes } from 'react-router-dom'
import AddBike from './Pages/Admin/AddBike/AddBike'
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin'
import UserManage from './Pages/Admin/UserManage/UserManage'
import Home from './Pages/User/Home/Home'
import Login from './Pages/User/Login/Login'
import Profile from './Pages/User/Profile/Profile'
import Signup from './Pages/User/Signup/Signup'
import Test from './Pages/User/Test/Test'
function App() {

  return (
    <div>
      <Routes>
      <Route path='/admin' element={<AdminLogin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' exact element={<Home />} />
      <Route path='/profile' exact  element={<Profile />} />
      <Route path='/admin/user-manage' exact element={<UserManage />} />
      <Route path='/test' exact element={<Test />} />
      <Route path='/admin/add-bike' exact element={<AddBike />} />
      </Routes>
    </div>
  )
}

export default App
