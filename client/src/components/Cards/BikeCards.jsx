import { Box, Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { homeBikeAction } from '../../Redux/Actions/userActions'
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'
import BookingButton from '../Button/BookingButton/BookingButton'

function BikeCards() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const bikes = useSelector((state) => state.homeBikeReducer)
    const { loading, bikesData, bikeDataError } = bikes

    useEffect(() => {
        dispatch(homeBikeAction())
    }, [])

    return (
        <>

                {
                    loading ? <Loading/> :

                    bikesData ?
                        bikesData.map((bike, index) => {
                            return (
                                <Box key={index}>
                                <Card sx={{ width: 350 }} >
                                    <CardHeader
                                        title={bike.bikeName}
                                        subheader={bike.bikeModel}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={bike.photo[0]}
                                        alt="bike"
                                        onClick={(e)=>navigate(`/single-bike-view`, { state: { bikesData,bikeName: bike?.bikeName  } })}
                                    />
                                    <CardContent>
                                        <Typography variant="body1" color="text">
                                            fule type : {bike.fuel}
                                        </Typography>
                                        <Typography variant="body1" color="text">
                                            description : {bike.description} .
                                        </Typography>
                                        <Typography variant="body1" color="text">
                                            Rent from : <b> <span style={{ color: 'black' }}>{bike.price}/hr</span> </b>
                                        </Typography>

                                        {/* <Button 
                                        sx={{ mt: 2 }} 
                                        fullWidth 
                                        variant="contained"
                                        >Book Now</Button> */}
                                    </CardContent>
                                </Card>
                                </Box>
                            )
                        })

                        : "No Data Availabe"
                }
            
        </>
    )
}

export default BikeCards
