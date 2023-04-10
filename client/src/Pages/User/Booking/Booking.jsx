import { Box, Button, Checkbox, Container, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useLocation } from 'react-router-dom';
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined';
import moment from "moment"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userBookingBikeAction, userGetLocation } from '../../../Redux/Actions/userActions';

import StripePayButton from '../../../components/Button/StripePayButton/StripePayButton';

import { DatePicker } from "antd"
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const { RangePicker } = DatePicker

function Booking() {

  const dispatch = useDispatch()
  const location = useLocation();
  const { bikesData } = location.state;
  const clickedBike = bikesData.find((bike) => bike.bikeName === location.state.bikeName);
  const branchLocation = useSelector((state) => state.userLocationReducer.locationData)
  console.log('brandch location', branchLocation);


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
      <Container maxWidth="lg" >
        <Container maxWidth="md" sx={{ display: 'flex', gap: 2 }}>
          <Box maxWidth="md" sx={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <img src={clickedBike.photo[0]}
              height={300}
              width={300}
              alt='d' />
          </Box>
          <Box maxWidth="md"  sx={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',width:"600px"}}>
            <Typography variant="h4" sx={{ textAlign: 'center', my: 1 }}>Bike Details</Typography>
            <Container maxWidth="md" >
              <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 'bold' }}>Bike Name: {clickedBike.bikeName}</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Bike Model: {clickedBike.bikeModel}</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Description: {clickedBike.description}.</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Rent Per Hour: ${clickedBike.price}</Typography>
              <Typography variant="body1" sx={{ fontSize: 16, my: 1 }}>Fuel Type: {clickedBike.fuel}</Typography>
            </Container>
          </Box>
        </Container>

        <Container maxWidth="md">
          <Container>
            <Typography variant="h6" sx={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold',my:2}}>Book Your Bike</Typography>
          </Container>
          <Container maxWidth="md">

            <Box sx={{ height: "50px", mt: 3 }}>
              <Typography>
                Select Date Range
              </Typography>
              <RangePicker
                showTime={{ format: "MM DD yyyy HH:mm" }}
                format="MM DD yyyy HH:mm"
                style={{ width: "100%", height: "100%" }}
                onChange={selectTimeSlots}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel id="demo-simple-select-label">start Off Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pickupLocation} // retrieve the selected value from React Hook Form
                  label="pickup location"
                  name='pickupLocation'

                  onChange={(e) => setPickupLocation(e.target.value)}
                >

                  {branchLocation
                    ? branchLocation.map((x) => (
                      <MenuItem key={x._id} value={x.location}>

                        {x.location}
                      </MenuItem>
                    ))
                    : (
                      <MenuItem >No locations available</MenuItem>
                    )}
                </Select>

              </FormControl>

              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel id="demo-simple-select-label">Drop Off Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dropOffLocation} // retrieve the selected value from React Hook Form
                  label="drop Off location"
                  name='dropOffLocation'

                  onChange={(e) => setDropOffLocation(e.target.value)}
                >

                  {branchLocation
                    ? branchLocation.map((x) => (
                      <MenuItem key={x._id} value={x.location}>

                        {x.location}
                      </MenuItem>
                    ))
                    : (
                      <MenuItem >No locations available</MenuItem>
                    )}
                </Select>

              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
              <Typography variant="h5">Rent per Hour : {clickedBike.price}/hr</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 3 }}>
              <Typography variant="h5">Total Hour :{totalHours}/hr</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
              <div>
                <Checkbox
                  {...label}
                  icon={<BookmarkBorderIcon />}
                  checkedIcon={<BookmarkIcon />}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNeedHelmet(true)
                    } else {
                      setNeedHelmet(false)
                    }
                  }}
                ></Checkbox>Do you want a Helmet for riding
              </div>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
              <Typography>Total Amount : {totalAmount} $</Typography>
            </Box>

            

            <StripePayButton bookingData={bookingData}
             
            >Ckeck Out</StripePayButton>
          </Container>
        </Container>
      </Container>
    </>
  )
}

export default Booking
