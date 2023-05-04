import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { homeBikeAction } from '../../Redux/Actions/userActions'
import Loading from '../Loading/Loading'
import { useNavigate } from 'react-router-dom'

function BikeCards() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { loading, bikesData, bikeDataError } = useSelector((state) => state.homeBikeReducer)
    const bikes = bikesData

    useEffect(() => {
        dispatch(homeBikeAction())
    }, [])

    return (
        <>

            {
                loading ? <Loading /> :

                    bikes ?
                        bikes.map((bike, index) => {
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
                                            onClick={(e) => navigate(`/single-bike-view`, { state: { bikes, bikeId: bike?._id } })}
                                        />
                                        <CardContent>
                                            <Typography variant="body1" color="text">
                                                fule type : {bike.fuel}
                                            </Typography>
                                            <Typography variant="body1" color="text">
                                                bike Model : {bike.bikeModel} .
                                            </Typography>
                                            <Typography variant="body1" color="text">
                                                Rent from : <b> <span style={{ color: 'black' }}>{bike.price}/hr</span> </b>
                                            </Typography>

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
