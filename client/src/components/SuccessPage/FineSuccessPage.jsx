import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { userFinePaymentSuccessAction } from '../../Redux/Actions/userActions'
import NavBar from '../NavBar/NavBar'
import { Box, Button, Grid } from '@mui/material'


function FineSuccessPage() {

    const dispatch = useDispatch()
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search)
    console.log("searchPrams fine success", searchParams.userId);

    const userId = searchParams.get(`userId`).trim()
    const bikeId = searchParams.get('bikeId').trim()
    const bookingId = searchParams.get("bookingId").trim()
    const startTime = searchParams.get('startTime').trim()
    const endTime = searchParams.get('endTime').trim()

    console.log(userId, bikeId, bookingId, startTime, endTime, '||||||');

    const fineData = {
        userId,
        bikeId,
        bookingId,
        startTime,
        endTime,
    }
    useEffect(() => {
        dispatch(userFinePaymentSuccessAction(fineData))
    }, [])

    return (
        <>
            <NavBar />
            <Box display="flex" justifyContent="center" alignItems="center">
                <Box boxShadow={8} borderRadius={3} p={2} m={4} sx={{ maxWidth: "800px" }}>
                    <Grid container justifyContent="center" spacing={2}>
                        <img src={require("../../assests/images/successPhoto.jpg")} alt="success" />
                    </Grid>
                    <Box container justifyContent="center" >
                        Your payment successfull Return To the page
                        <Link to='/booked-bike'><Button>Rent Page </Button></Link>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default FineSuccessPage
