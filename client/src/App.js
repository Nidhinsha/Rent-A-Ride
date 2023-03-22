import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route , Routes } from 'react-router-dom'
import AddBike from './Pages/Admin/AddBike/AddBike'
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin'
import UserManage from './Pages/Admin/UserManage/UserManage'
import Home from './Pages/User/Home/Home'
import Login from './Pages/User/Login/Login'
import Profile from './Pages/User/Profile/Profile'
import Signup from './Pages/User/Signup/Signup'
import Test from './Pages/User/Test/Test'
function App() {

  // const userData = useSelector((state)=> state.userL)
  const adminData = useSelector((state)=> state.adminLoginReducer.adminLoginData)
  const userData = useSelector((state)=>state.userLoginReducer.userLoginDetails)
  return (
    <div>
      <Routes>
      
      <Route path='/login' element={userData ?  <Navigate to='/'/> : <Login />}  />
      <Route path='/signup' element={userData ? <Login/> : <Signup />} />
      <Route path='/' exact element={<Home />} />
      <Route path='/profile' exact  element={userData ? <Profile /> : <Login/>} />
     
      <Route path='/test' exact element={<Test />} />

      <Route path='/admin/login' element={ adminData ? <Navigate to='/admin/user-manage'/>: <AdminLogin />} />
      <Route path='/admin/user-manage' exact element={adminData ?  <UserManage /> :<Navigate to = '/admin/login'/>   } />
      <Route path='/admin/add-bike' exact element={adminData ? <AddBike /> : <AdminLogin />} />
      {/* <Route path='/admin/bikes' element={adminData ? } */}
      </Routes>
    </div>
  )
}

export default App
