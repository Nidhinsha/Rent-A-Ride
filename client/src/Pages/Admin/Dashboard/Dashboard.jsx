import React, { useEffect } from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import { Box, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardInfoAction } from '../../../Redux/Actions/adminActions';
import BookingChart from "../../../components/Charts/BookingChart"
import UserPieChart from '../../../components/Charts/UserPieChart';
import BikeChart from '../../../components/Charts/BikeChart';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

function Dashboard() {

  const dispatch = useDispatch()

  const details = useSelector((state)=>state.getDashboardInfoReducer?.dashboardData)

  useEffect(()=>{
    dispatch(getDashboardInfoAction())
  },[])

  return (
    <Box  sx={{ display: 'flex' }}>
      <SideBar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
      <DrawerHeader />
      <Box sx={{display:'flex'}}>
      <BookingChart
        pending = {details ? details?.pendingBooking : 0}
        total = {details ? details?.totalBooking : 0}
        completed = {details ? details?.completedBooking : 0}
        cancelled = {details ? details?.cancelledBooking : 0}
        onRide = {details ? details?.onRideBooking : 0}
        title={"Booking Data"}
      />
      <UserPieChart
        title={"Users Data"}
        totalUser={details ? details?.totalUser :0}
        blockedUser={details ? details?.blockedUser :0}
        unBlockedUser={details ? details?.unBlockedUser :0}
        totalOwners={details ? details?.totalOwners :0}
      />
      </Box>
      <BikeChart
      title={"Bikes Data"}
        allBikes={details ? details?.allBikes :0}
        rendRequest={details ? details?.rendRequest :0}
        rejectRequest={details ? details?.rejectRequest :0}
      />
      </Box>

    </Box>
  )
}

export default Dashboard
