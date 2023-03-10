import React from 'react'
import { Route , Routes } from 'react-router-dom'
import AdminLogin from './components/Admin/AdminLogin/AdminLogin'
import Home from './components/User/Home/Home'
import Login from './components/User/Login/Login'
import Signup from './components/User/Signup/Signup'
function App() {

  return (
    <div>
      <Routes>
      <Route path='/admin' element={<AdminLogin />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' exact element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
