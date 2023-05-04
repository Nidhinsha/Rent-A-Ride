import { Box, Button, Checkbox, Container, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, Input, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import NavBar from '../../../components/NavBar/NavBar'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userBookingBikeAction, userGetCouponsAction, userGetLocation, userGetWalletAction } from '../../../Redux/Actions/userActions';
import Swal from "sweetalert2"
import { DatePicker } from "antd"
import Footer from '../../../components/Home/Footer/Footer';
import { userBookingBikeAPI } from '../../../Api/User/ApiCalls';
import { Toaster, toast } from 'react-hot-toast';
import ErrorMessage from '../../../components/Alert/Error';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const ariaLabel = { 'aria-label': 'description' };


const { RangePicker } = DatePicker

function Booking() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const { bikesData, bikeId, bikes } = location.state

  const clickedBike = bikesData?.data?.find(bike => bike?._id === bikeId) || bikes?.find(bike => bike?._id === bikeId)

  const branchLocation = useSelector((state) => state?.userLocationReducer?.locationData)

  const coupons = useSelector((state) => state.userGetCouponReducer.couponData)

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalHours, setTotalHours] = useState(0)
  const [needHelmet, setNeedHelmet] = useState(false)

  const [pickupLocation, setPickupLocation] = useState("")
  const [dropOffLocation, setDropOffLocation] = useState("")
  const [pickupError, setPickupError] = useState(false)
  const [dropOffError, setDropOffError] = useState(false)

  const [coupon, setCoupon] = useState(null)
  const [couponVerified, setCouponVerified] = useState(false)
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState(false)
  const [getCouponPrice, setGetCouponPrice] = useState()

  const [stripe, setStripe] = useState(false)
  const [value, setValue] = useState("")

  const [wallet, setWallet] = useState(false)
  const [walletError, setWalletError] = useState(false)

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // checking the booking date is valid
  const validateDateOfBooking = useSelector((state) => state.userBookingBikeReducer)
  const { bookingBikeLoading, bookingBikeData, bookingBikeDataError } = validateDateOfBooking
  const walletAmount = useSelector((state) => state.userGetWalletReducer?.walletData)

  useEffect(() => {
    dispatch(userGetCouponsAction())
    dispatch(userGetLocation())
    dispatch(userGetWalletAction())
  }, [])

  const selectTimeSlots = (values) => {
    setStartDate(moment(values[0].$d).format('MMMM Do YYYY, h:mm:ss a'));
    setEndDate(moment(values[1].$d).format('MMMM Do YYYY, h:mm:ss a'));
    setTotalHours(values[1].diff(values[0], 'hours'))
  }

  // disable date
  function disabledDate(current) {
    // Disable dates before today's date
    return current && current < moment().startOf('day');
  }

  // coupon verify

  const verifyCoupon = (coupon) => {
    const checkCoupon = coupons.find(check => check.couponCode === coupon)
    const userId = JSON.parse(localStorage.getItem("userInfo")).id

    if (checkCoupon) {
      const filteredCoupon = coupons.filter(x => x.couponCode === coupon)
      if (filteredCoupon.length > 0) {
        filteredCoupon.forEach(coupon => {
          if (coupon.users.some(user => user.userId === userId)) {
            setCouponApplied(true)
            setCouponError(false)
          } else {
            setCouponApplied(false)
            setCouponVerified(true)
            setCouponError(false)
            setGetCouponPrice(coupons.find(x => x.couponCode === coupon)?.couponPrice || 0)
          }
        })
      } else {
      }
    } else {
      setCouponVerified(false)
      setCouponApplied(false)
      setCouponError(true)
    }

  }

  // location 
  const handlePickupLocation = (e) => {
    if (e.target.value !== '') {
      setPickupLocation(e.target.value)
      setPickupError(false)
    } else {
      setPickupError(true)
    }
  }

  const handleDropOffLocation = (e) => {
    if (e.target.value !== '') {
      setDropOffLocation(e.target.value)
      setDropOffError(false)
    } else {
      setPickupError(true)
    }
  }


  let totalAmount = needHelmet === true && couponVerified === true ?
    (totalHours * clickedBike?.price + 50) - (coupons.find((x) => x.couponCode === coupon)?.couponPrice || 0)
    : needHelmet === true
      ? totalHours * clickedBike?.price + 50
      : needHelmet === false && couponVerified === true
        ? (totalHours * clickedBike?.price) - (coupons.find((x) => x?.couponCode === coupon)?.couponPrice || 0)
        : totalHours * clickedBike?.price


  const stripeData = {
    userId: JSON.parse(localStorage.getItem("userInfo"))?.id,
    userName: JSON.parse(localStorage.getItem("userInfo"))?.firstName,
    bikeId: clickedBike?._id,
    bikeData: clickedBike,
    totalAmount,
    totalHours,
    needHelmet: needHelmet,
    bookedTimeSlots: {
      startDate,
      endDate
    },
    pickupLocation,
    dropOffLocation,
    couponCode: coupon,
    paymentType: "stripe"
  }
  const walletBookingData = {
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
    dropOffLocation,
    couponCode: coupon,
    paymentType: "wallet",
    walletId: walletAmount?._id
  }

  const handleBookNow = () => {
    if (pickupLocation === '' || dropOffLocation === '') {
      setPickupError(true)
      setDropOffError(true)
      return
    }
    if (wallet === false && stripe === true) {
      setWalletError(false)
      setPickupError(false)
      setDropOffError(false)

      dispatch(userBookingBikeAction(stripeData))
    } else if (wallet === true && stripe === false) {
      if (walletAmount?.walletAmount >= totalAmount) {
        setWalletError(false)
        setPickupError(false)
        setDropOffError(false)
        userBookingBikeAPI(walletBookingData).then((data) => {

          Swal.fire(
            'Congrats!',
            'You booking is successfull!',
            'success'
          ).then(() => {
            navigate('/booked-bike')
          })

        })
      } else {
        setWalletError(true)
      }
    }
  }

  return (
    <>
      <NavBar />
      <Container sx={{ display: 'flex', gap: 2 }}>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ duration: 4000 }}
        />
        <Container maxWidth="md">

          <Box sx={{ backgroundColor: 'primary.dark', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <img src={clickedBike.photo[0]} alt="bike"
              height={400}
              width={600}
            />
          </Box>

          <Box sx={{ mt: 3, boxShadow: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>Bike Details</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body1" sx={{ fontSize: 20 }}>Bike Name: {clickedBike.bikeName}</Typography>
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
            {
               bookingBikeDataError ? <p style={{ color: "red" }}>{bookingBikeDataError}</p> : ""
             }
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="MM DD YYYY HH:mm"
              style={{ width: "100%", height: "100%" }}
              onChange={selectTimeSlots}
              disabledDate={disabledDate} // Set the disabledDate function
            />
          </Box>

          {/* starting and droping location */}
          <Box sx={{ mt: 3 }}>

            <Typography variant='h6'>Select your location</Typography>


            <Box sx={{ display: 'flex', gap: 2 }}>

              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel id="demo-simple-select-label">start Off Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pickupLocation} // retrieve the selected value from React Hook Form
                  label="pickup location"
                  name='pickupLocation'
                  required

                  onChange={handlePickupLocation}
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
                {
                  pickupError && <FormHelperText style={{ color: 'red' }}>Please select a pickUp location</FormHelperText>
                }
              </FormControl>

              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel id="demo-simple-select-label">Drop Off Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dropOffLocation} // retrieve the selected value from React Hook Form
                  label="drop Off location"
                  name='dropOffLocation'
                  required
                  onChange={handleDropOffLocation}
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
                {
                  dropOffError && <FormHelperText style={{ color: 'red' }}>Please select a drop-off location</FormHelperText>
                }

              </FormControl>
            </Box>
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
              <div>Do you want a Helmet for riding</div>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', mt: 3 }}>
            <Box maxWidth='lg' sx={{ width: "100%" }}>
              <Input
                placeholder="Placeholder"
                inputProps={ariaLabel}
                fullWidth
                onChange={(e) => setCoupon(e.target.value)}
              />
            </Box>
            <Box maxWidth='md'>
              <Button
                variant="outlined"
                onClick={(e) => {
                  verifyCoupon(coupon)
                }}
              >Apply Coupon</Button>
            </Box>
            {
              couponError ? Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Coupon is not valid',
                showConfirmButton: false,
                timer: 3000
              }) : ""
            }
            {
              couponApplied ? Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Coupon is already used!!',
                showConfirmButton: false,
                timer: 3000
              }) : ""
            }
          </Box>
          <Divider />

          <Box>
            {
              startDate && endDate ?


                <Box>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant='h4'>Check out</Typography>
                  </Box>

                  <Container sx={{ boxShadow: 3 }}>
                    {
                      pickupLocation && dropOffLocation ?
                        <>
                          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box maxWidth='lg' >
                              <Typography variant='h6'>Pickup Location</Typography>
                            </Box>
                            <Box maxWidth='lg'>
                              <Typography variant='h6'>{pickupLocation}</Typography>

                            </Box>
                          </Container>

                          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box maxWidth='lg'>
                              <Typography variant='h6'> Drop Location</Typography>
                            </Box>
                            <Box maxWidth='lg' >
                              <Typography variant='h6'>{dropOffLocation}</Typography>
                            </Box>
                          </Container>
                        </>
                        : ""
                    }
                    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box maxWidth='lg' >
                        <Typography variant='h6'>Rent Per Hour</Typography>

                      </Box>
                      <Box maxWidth='lg'>
                        <Typography variant='h6'>{clickedBike.price}/hr</Typography>
                      </Box>
                    </Container>



                    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box maxWidth='lg' >
                        <Typography variant='h6'>Total Hours</Typography>

                      </Box>
                      <Box maxWidth='lg' >
                        <Typography variant='h6'>  {totalHours}/hr</Typography>

                      </Box>
                    </Container>

                    {
                      couponVerified === true ?

                        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box maxWidth='lg' >
                            <Typography variant='h6'>Coupon Offer</Typography>

                          </Box>
                          <Box maxWidth='lg'>
                            <Typography variant='h6'>
                              {
                                coupons.find((x) => x.couponCode === coupon)?.couponPrice || 0
                              }
                            </Typography>
                          </Box>
                        </Container>
                        :
                        ""
                    }

                    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box maxWidth='lg' >

                        <Typography variant='h6'> Total Amount</Typography>

                      </Box>
                      <Box maxWidth='lg'>
                        <Typography variant='h6'> Rs. {totalAmount}</Typography>
                      </Box>
                    </Container>

                  </Container>


                  <Container sx={{ display: 'flex', mt: 2 }} >
                    <Divider />
                    <Box >
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Payment</FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          value={value}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="wallet"
                            control={<Radio />}
                            label="With Wallet"
                            onChange={() => {
                              setWallet(true)
                              setStripe(false)
                            }}
                          />
                          {
                            walletError ? Swal.fire({
                              icon: 'error',
                              title: 'Insufficent Money',
                              text: 'Wallet does not have enough money!',
                             
                            }) : ""
                          }
                          <FormControlLabel
                            value="stripe"
                            control={<Radio />}
                            label="With Stripe"
                            onChange={() => {
                              setStripe(true)
                              setWallet(false)
                              setWalletError(false)
                            }}
                          />

                        </RadioGroup>
                      </FormControl>
                    </Box>
                  </Container>

                  <Container>
                    {
                      wallet || stripe ? <Button
                        variant='outlined'
                        fullWidth
                        onClick={handleBookNow}
                      >CheckOut</Button>
                        :
                        <Button
                          variant='outlined'
                          fullWidth
                          disabled
                        >CheckOut</Button>
                    }
                  </Container>
                </Box>
                : ""
            }
          </Box>
        </Container>
      </Container>
      <Box sx={{ mt: 3 }}>
        <Footer />
      </Box>
    </>
  )
}

export default Booking
