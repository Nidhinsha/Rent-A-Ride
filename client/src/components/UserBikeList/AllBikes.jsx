import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import BookingButton from '../Button/BookingButton/BookingButton';

function AllBikes({allBikes}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const bikes = useSelector((state) => state.userGetBikeReducer)
    const { bikesDataLoading, bikesData, bikesDataError } = bikes

    return (
        <>
            <Box>
                <div className='d-flex flex-wrap '>
                    {
                        bikesDataLoading ? <Loading /> :
                        allBikes?.data ? allBikes?.data.map((data, index) => {
                                return (
                                    <Card key={index} sx={{ height: 350, width: 275, m: 3,boxShadow:5 }}>
                                        <CardActionArea>
                                            <Typography gutterBottom variant="h6" textAlign='center' >
                                                {data.bikeName}
                                            </Typography>
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                width="140"
                                                image={data.photo[0]}
                                                alt={data.bikeName}
                                                onClick={(e) => navigate(`/single-bike-view`, { state: { bikesData,bikeId: data._id  } })}
                                            />
                                            <CardContent>

                                                <Typography variant="h6" color="text.secondary" fontWeight="bold" textAlign='center'>
                                                    Rent Now @ Price : {data.price} /hr
                                                </Typography>

                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button
                                             label="Book Now" variant='outlined'  icon="pi pi-shopping-bag" style={{ width: '100%', fontSize: 'large' }}
                                             onClick={(e)=>navigate('/booking',{
                                                state:{bikesData,bikeId:data?._id}
                                             })}
                                              >Book Now </Button>

                                        </CardActions>
                                    </Card>
                                )
                            }) : "No bike"
                    }
                   
                </div>
            </Box>
        </>
    )
}

export default AllBikes