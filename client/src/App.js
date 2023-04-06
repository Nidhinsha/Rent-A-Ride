import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route , Routes } from 'react-router-dom'
import AddBike from './Pages/Admin/AddBike/AddBike'
import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin'
import BikeRequest from './Pages/Admin/BikeRequest/BikeRequest'
import Dashboard from './Pages/Admin/Dashboard/Dashboard'
import Location from './Pages/Admin/Location/Location'
import UserManage from './Pages/Admin/UserManage/UserManage'
import ViewBike from './Pages/Admin/ViewBike/ViewBike'
import Bikes from './Pages/User/Bikes/Bikes'
import Home from './Pages/User/Home/Home'
import Login from './Pages/User/Login/Login'
import Profile from './Pages/User/Profile/Profile'
import RentBike from './Pages/User/RentBike/RentBike'
import RentedBikes from './Pages/User/RentedBikes/RentedBikes'
import Signup from './Pages/User/Signup/Signup'
import SingleBikeView from './Pages/User/SingleBikeView/SingleBikeView'
import Test from './Pages/User/Test/Test'
import OtpLogin from './Pages/User/OtpLogin/OtpLogin'
import EditBike from './Pages/Admin/EditBike/EditBike'
import Coupons from './Pages/Admin/Coupons/Coupons'
function App() {

  // const userData = useSelector((state)=> state.userL)
  const adminData = useSelector((state)=> state.adminLoginReducer.adminLoginData)
  const userData = useSelector((state)=>state.userLoginReducer.userLoginDetails)
  return (
    <div>
      <Routes>
      <Route path='/login' element={userData ?  <Navigate to='/'/> : <Login />}  />
      <Route path='/signup' element={userData ? <Login/> : <Signup />} />
      <Route path='/otp-login' element={userData ? <Navigate to='/' /> : <OtpLogin/>}/>
      <Route path='/' exact element={<Home />} />
      <Route path='/profile' exact  element={userData ? <Profile /> : <Login/>} />
      <Route path='/rent-bike' exact element={userData? <RentBike />: <Login/> } />
      <Route path='/bikes' exact element={<Bikes/>} />
      <Route path='/single-bike-view' exact element={<SingleBikeView/>} />
      <Route path='/rented-bikes' exact element={<RentedBikes/>} />
      <Route path='/test' exact element={<Test />} /> 
      
      <Route path='/admin/login' element={ adminData ?<Dashboard/>: <AdminLogin />} />
      <Route path='/admin/user-manage' exact element={adminData ?  <UserManage /> :<AdminLogin /> } />
      <Route path='/admin/add-bike' exact element={adminData ? <AddBike /> : <AdminLogin />} />
      <Route path='/admin/edit-bike' exact element={adminData ? <EditBike/> :<AdminLogin/>} />
      <Route path='/admin/view-bike' exact element={adminData ? <ViewBike />: <AdminLogin /> } />
      <Route path='/admin/dashboard' exact element={adminData ? <Dashboard /> : <AdminLogin/>} />
      <Route path='/admin/bike-request' exact element={adminData ? <BikeRequest/> : <AdminLogin/>} />
      <Route path='/admin/location' exact element={adminData ? <Location/>:<AdminLogin/>} />
      <Route path='/admin/coupons' exact element={adminData ? <Coupons/> :<AdminLogin/>} />
      {/* <Route path='/admin/bikes' element={adminData ? } */}
      </Routes>
    </div>
  )
}

export default App
