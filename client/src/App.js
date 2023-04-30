import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AdminLogin from './Pages/Admin/AdminLogin/AdminLogin'
import Login from './Pages/User/Login/Login'
import Signup from './Pages/User/Signup/Signup'
import Test from './Pages/User/Test/Test'
import OtpLogin from './Pages/User/OtpLogin/OtpLogin'
import { CircularProgress } from '@mui/material'
import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import PaymentCancel from './components/Stripe/PaymentCancel/PaymentCancel'

const Dashboard = lazy(() => import("./Pages/Admin/Dashboard/Dashboard"))
const AddBike = lazy(() => import("./Pages/Admin/AddBike/AddBike"))
const EditBike = lazy(() => import("./Pages/Admin/EditBike/EditBike"))
const ViewBike = lazy(() => import("./Pages/Admin/ViewBike/ViewBike"))
const BikeRequest = lazy(() => import("./Pages/Admin/BikeRequest/BikeRequest"))
const ViewBookedBike = lazy(() => import("./Pages/Admin/ViewBookedBike/ViewBookedBike"))
const Location = lazy(() => import("./Pages/Admin/Location/Location"))
const Coupons = lazy(() => import("./Pages/Admin/Coupons/Coupons"))

const UserManage = lazy(() => import("./Pages/Admin/UserManage/UserManage"))
const Home = lazy(() => import("./Pages/User/Home/Home"))
const Profile = lazy(() => import("./Pages/User/Profile/Profile"))
const Chat = lazy(() => import("./Pages/User/Chat/Chat"))
const Bikes = lazy(() => import("./Pages/User/Bikes/Bikes"))
const RentBike = lazy(() => import("./Pages/User/RentBike/RentBike"))
const RentedBikes = lazy(() => import("./Pages/User/RentedBikes/RentedBikes"))
const SingleBikeView = lazy(() => import("./Pages/User/SingleBikeView/SingleBikeView"))
const Booking = lazy(() => import("./Pages/User/Booking/Booking"))
const BookingSuccess = lazy(() => import("./components/SuccessPage/BookingSuccess"))
const FineSuccessPage =lazy(()=>import("./components/SuccessPage/FineSuccessPage"))
const BookedBikes = lazy(() => import("./Pages/User/BookedBikes/BookedBikes"))
const Wallet = lazy(()=>import("./Pages/User/Wallet/Wallet"))
const BikesReport = lazy(()=>import("./Pages/Admin/BikesReport/BikesReport"))



function App() {

 
  // const userData = useSelector((state)=> state.userL)
  const adminData = useSelector((state) => state.adminLoginReducer.adminLoginData)
  const userData = useSelector((state) => state.userLoginReducer.userLoginDetails)
 
  return (
    <div>
      <Router>
        <Suspense fallback={
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
             <CircularProgress color="inherit" />
           </div>
          }>

          <Routes>
            <Route path='/login' element={userData ? <Navigate to='/' /> : <Login />} />
            <Route path='/signup' element={userData ? <Login /> : <Signup />} />
            <Route path='/otp-login' element={userData ? <Navigate to='/' /> : <OtpLogin />} />
            <Route path='/' exact element={<Home />} />
            <Route path='/profile' exact element={userData ? <Profile /> : <Login />} />
            <Route path='/rent-bike' exact element={userData ? <RentBike /> : <Login />} />
            <Route path='/bikes' exact element={<Bikes />} />
            <Route path='/single-bike-view' exact element={<SingleBikeView />} />
            <Route path='/rented-bikes' exact element={userData ? <RentedBikes /> : <Login />} />
            <Route path='/booking' exact element={userData ? <Booking /> : <Login />} />
            <Route path='/booked-bike' exact element={userData ? <BookedBikes /> : <Login />} />
            <Route path='/booking-success' exact element={<BookingSuccess />} />
            <Route path='/userFine-payment-success' exact element={<FineSuccessPage/>} />
            <Route path='/chat' exact element={userData ? <Chat /> : <Login />} />
            <Route path='/wallet' exact element={userData ? <Wallet/> : <Login/>} />
            <Route path='/test' exact element={<Test />} />
            <Route path='/cancel' exact element={<PaymentCancel/>} />


            <Route path='/admin/login' element={adminData ? <Dashboard /> : <AdminLogin />} />
            <Route path='/admin/user-manage' exact element={adminData ? <UserManage /> : <AdminLogin />} />
            <Route path='/admin/add-bike' exact element={adminData ? <AddBike /> : <AdminLogin />} />
            <Route path='/admin/edit-bike' exact element={adminData ? <EditBike /> : <AdminLogin />} />
            <Route path='/admin/view-bike' exact element={adminData ? <ViewBike /> : <AdminLogin />} />
            <Route path='/admin/dashboard' exact element={adminData ? <Dashboard /> : <AdminLogin />} />
            <Route path='/admin/bike-request' exact element={adminData ? <BikeRequest /> : <AdminLogin />} />
            <Route path='/admin/location' exact element={adminData ? <Location /> : <AdminLogin />} />
            <Route path='/admin/coupons' exact element={adminData ? <Coupons /> : <AdminLogin />} />
            <Route path='/admin/view-booked-bike' exact element={adminData ? <ViewBookedBike /> : <AdminLogin />} />
            <Route path='/admin/bikes-report' exact element={adminData ? <BikesReport/> : <AdminLogin/>} />

            <Route path='*' element={<NotFoundPage />} />

          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App
