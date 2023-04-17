import { Box, Button, Checkbox, Container, Divider, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useLocation } from 'react-router-dom';
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined';
import moment from "moment"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userBookingBikeAction, userGetLocation } from '../../../Redux/Actions/userActions';

import StripePayButton from '../../../components/Button/StripePayButton/StripePayButton';


import { DatePicker, Grid } from "antd"
import styled from '@emotion/styled';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const ariaLabel = { 'aria-label': 'description' };


const { RangePicker } = DatePicker

function Booking() {

  const dispatch = useDispatch()
  const location = useLocation();
  const { bikesData } = location.state;
  const clickedBike = bikesData.find((bike) => bike.bikeName === location.state.bikeName);
  const branchLocation = useSelector((state) => state.userLocationReducer.locationData)



  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalHours, setTotalHours] = useState(0)
  const [needHelmet, setNeedHelmet] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropOffLocation, setDropOffLocation] = useState("")

  console.log(moment(startDate).format('DD MM yyyy HH:mm'), 'start date');
  console.log(moment(endDate).format('DD MM yyyy HH:mm'), 'end date');

  const selectTimeSlots = (values) => {
    setStartDate(moment(values[0]).format('DD MM yyyy HH:mm'));
    setEndDate(moment(values[1]).format('DD MM yyyy HH:mm'));
    setTotalHours(values[1].diff(values[0], 'hours'))
  }

  useEffect(() => {
    setTotalAmount(totalHours * clickedBike.price)

    if (needHelmet) {
      setTotalAmount(totalAmount + 50)
    }
  }, [needHelmet, totalHours])

  useEffect(() => {
    dispatch(userGetLocation())
  }, [])

  const bookingData = {
    userId: JSON.parse(localStorage.getItem("userInfo")).id,
    userName: JSON.parse(localStorage.getItem("userInfo")).firstName,
    bikeId: clickedBike._id,
    bikeData: clickedBike,
    totalAmount,
    totalHours,
    needHelmet: needHelmet,
    bookedTimeSlots: {
      startDate,
      endDate
    },
    pickupLocation,
    dropOffLocation
  }

  const handleBookNow = () => {
    dispatch(userBookingBikeAction(bookingData))
  }
  return (
    <>
      <NavBar />
      <Container sx={{ display: 'flex', gap: 2 }}>
        <Container maxWidth="md">

          <Box sx={{ backgroundColor: 'primary.dark', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <img src={clickedBike.photo[0]} alt="bike"
              height={300}
              width={300}
            />
          </Box>

          <Box sx={{ backgroundColor: 'error.dark', mt: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>Bike Details</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontSize: 20, fontWeight: 'bold' }}>Bike Name: {clickedBike.bikeName}</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Bike Model: {clickedBike.bikeModel}</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Description: {clickedBike.description}.</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Rent Per Hour: ${clickedBike.price}</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Fuel Type: {clickedBike.fuel}</Typography>
            </Box>
          </Box>

        </Container>
        <Container maxWidth="md">
          <Box>
            <Typography>Select Time Slots</Typography>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="MM DD YYYY HH:mm"
              style={{ width: "100%", height: "100%" }}
              onChange={selectTimeSlots}
            />
          </Box>

          <Box sx={{ display: 'flex', mt: 2 }}>
            <Box>
              <Checkbox
                {...label}
                onChange={(e) => {
                  if (e.target.checked) {
                    setNeedHelmet(true)
                  } else {
                    setNeedHelmet(false)
                  }
                }}
              ></Checkbox>
            </Box>
            <Box sx={{ mt: 1.5 }}>
              <h6>Do you want a Helmet for riding</h6>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', mt: 3 }}>
            <Box maxWidth='lg' sx={{ width: "100%" }}>
              <Input
                placeholder="Placeholder"
                inputProps={ariaLabel}
                fullWidth

              />
            </Box>
            <Box maxWidth='md'>
              <Button variant="outlined">Apply Coupon</Button>
            </Box>
          </Box>
          <Divider />

          <Box>
            <Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant='h4'>Check out</Typography>
              </Box>
              <Container>
                <Container sx={{display:'flex',justifyContent:'space-between',boxShadow: 3}}>
                  <Box maxWidth='lg' sx={{backgroundColor:'yellow'}}>
                    1
                  </Box>
                  <Box  maxWidth='lg' sx={{backgroundColor:'blueviolet'}}>
                    1
                  </Box>
                </Container>
              </Container>


            </Box>
          </Box>
        </Container>

      </Container>
    </>
  )
}

export default Booking
