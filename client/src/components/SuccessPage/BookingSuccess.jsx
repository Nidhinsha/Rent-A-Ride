import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userCreateOrderAction } from '../../Redux/Actions/userActions';
import { useDispatch } from 'react-redux';
import NavBar from "../NavBar/NavBar"
import { Box, Button, Container, Grid } from '@mui/material';
function BookingSuccess() {
  const dispatch = useDispatch()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const userId = searchParams.get(`userId`)
  const userName = searchParams.get('userName')
  const bikeId = searchParams.get('bikeId')
  const bikeName = searchParams.get('bikeName')
  const bikeModel = searchParams.get('bikeModel')
  const photo = searchParams.get('photo')
  const totalAmount = searchParams.get('totalAmount')
  const totalHours = searchParams.get('totalHours')
  const startDate = searchParams.get('startDate')
  const endDate = searchParams.get('endDate')
  const pickupLocation = searchParams.get('pickupLocation')
  const dropOffLocation = searchParams.get('dropOffLocation')
  const needHelmet = searchParams.get('needHelmet')
  const paymentType = searchParams.get('paymentType')
  const couponCode = searchParams.get('couponCode')

  const bookingDetails = {
    userId,
    userName,
    bikeId,
    bikeName,
    bikeModel,
    photo,
    totalAmount,
    bookedTimeSlots : {
      startDate,
      endDate
    },
    totalHours,
    pickupLocation,
    dropOffLocation,
    needHelmet,
    paymentType,
    couponCode
  }

  useEffect(()=>{
      dispatch(userCreateOrderAction(bookingDetails))
  },[])
  return (
    <>
    <NavBar/>
    <Box display="flex" justifyContent="center" alignItems="center">
    <Box boxShadow={8} borderRadius={3} p={2} m={4} sx={{ maxWidth: "800px" }}>
    <Grid container justifyContent="center" spacing={2}>
      <img src={require("../../assests/images/successPhoto.jpg")} alt="success" />
    </Grid>
    <Box container justifyContent="center" >
      Your Bike Has Been Booked Return To the page
      <Link to='/booked-bike'><Button>Rent Page </Button></Link>
    </Box>
    </Box>
    </Box>
    </>
  )
}

export default BookingSuccess
