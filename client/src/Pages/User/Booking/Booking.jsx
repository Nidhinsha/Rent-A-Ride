import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Carousel } from 'react-bootstrap'
import NavBar from '../../../components/NavBar/NavBar'
import { useLocation } from 'react-router-dom';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import Checkbox from '@mui/material/Checkbox';
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { DatePicker } from "antd"
import moment from "moment"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userBookingBikeAction, userGetLocation } from '../../../Redux/Actions/userActions';
const { RangePicker } = DatePicker

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

    const handleBookNow = () => {
        const bookingData = {
            userId: JSON.parse(localStorage.getItem("userInfo")).id,
            bikeId: clickedBike._id,
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

        dispatch(userBookingBikeAction(bookingData))
    }

    return (
        <Box>
            <NavBar />
            <Box display="flex" justifyContent="center" alignItems="center"  >
                <Box boxShadow={3} borderRadius={4} p={5} maxWidth={1100} display="flex" justifyContent="center" >
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={6} md={6} mt={4}>
                            <Carousel variant="dark">
                                {clickedBike.photo.map((pic, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block  w-100 "
                                            src={pic}
                                            alt={`Slide ${index}`}
                                            style={{ height: "410px", borderRadius: "10px" }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>

                        </Grid>
                        <Grid item xs={12} md={6} direction="column" alignItems="flex-end">
                            <Box >
                                <Typography variant="h5" align="center" sx={{ mt: 2 }}  >
                                    Bike Details
                                </Typography>
                            </Box>

                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow={3} borderRadius={4} >
                                <Box>
                                    <Box>
                                        {clickedBike.bikeName}
                                    </Box>
                                    <Box>
                                        {clickedBike.brand}
                                    </Box>
                                    <Box>
                                        {clickedBike.color}
                                    </Box>
                                    <Box>
                                        {clickedBike.price} /hr
                                    </Box>
                                </Box>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow={3} borderRadius={4} m={2} >

                                <Box>
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">Pickup Location</InputLabel>


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
                                    <FormControl fullWidth sx={{mt:3}}>
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
                                <Box>
                                    <RangePicker showTime={{ format: "MM DD yyyy HH:mm" }} format="MM DD yyyy HH:mm"
                                        onChange={selectTimeSlots} />
                                </Box>
                                <Box>
                                    total Hours : {totalHours}
                                </Box>
                                <Box>
                                    Rent Per Hours :   {clickedBike.price} /hr
                                </Box>
                                <Box>
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
                                    /> helmet is required
                                </Box>
                                <Box>
                                    Total Amount : <b>{totalAmount}</b>
                                </Box>
                            </Box>
                        </Grid>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2, backgroundColor: "#6366F1", "&.MuiButtonBase-root:hover": {
                                    bgcolor: "#6366F1"
                                }
                            }}
                            size="large"

                            onClick={handleBookNow}
                        >
                            Book Now
                        </Button>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default Booking
