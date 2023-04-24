import React, { useEffect } from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import { Avatar, FormHelperText, Grid, styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardInfoAction } from '../../../Redux/Actions/adminActions';
import BookingChart from "../../../components/Charts/BookingChart"

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
  console.log(details,'detailsss');

  useEffect(()=>{
    dispatch(getDashboardInfoAction())
  },[])

  return (
    <div>
      <DrawerHeader />
      <SideBar/>
      <>
      <BookingChart
        pending = {details ? details?.pendingBooking : 0}
        total = {details ? details?.totalBooking : 0}
        completed = {details ? details?.completedBooking : 0}
        cancelled = {details ? details?.cancelledBooking : 0}
        onRide = {details ? details?.onRideBooking : 0}
      />
      </>
    </div>
  )
}

export default Dashboard
