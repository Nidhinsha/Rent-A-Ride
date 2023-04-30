import React from 'react';
import { Grid, Box, Typography,} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Loading from '../../../components/Loading/Loading'
import Carousel from 'react-bootstrap/Carousel';
import NavBar from '../../../components/NavBar/NavBar';
import { useLocation } from 'react-router-dom';
import './SingleBikeView.css'
import BookingButton from '../../../components/Button/BookingButton/BookingButton';
import Footer from '../../../components/Home/Footer/Footer';

function SingleBikeView() {

    const location = useLocation();
    const {bikesData,bikeId,bikes} = location.state

    const clickedBike =  bikesData?.data.find((bike) => bike._id === bikeId) || bikes.find((bike) => bike._id === bikeId)


    return (
        <><Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
            <NavBar />
            <Box display="flex" justifyContent="center" alignItems="center">
                <Box boxShadow={3} borderRadius={4} p={5} width="100%" maxWidth={1200} display="flex" justifyContent="center">
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} md={6} mt={4}>
                            <Carousel variant="dark">
                                {clickedBike?.photo?.map((pic, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block  w-100 "
                                            src={pic}
                                            alt={`Slide ${index}`}
                                            style={{ height: "400px", borderRadius: "10px" }} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>

                        </Grid>
                        <Grid item xs={12} md={6} sx={{mb:5}}  direction="column" alignItems="flex-end">

                            <Box style={{marginTop:'35px'}} display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow={3} borderRadius={4}>
                                <Box>
                                    <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                                        Bike Details
                                    </Typography>
                                </Box>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align='center'>Bike Name :</TableCell>
                                            <TableCell align='center'>{clickedBike.bikeName}</TableCell>
                                        </TableRow>

                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align='center'>Bike Model :</TableCell>
                                            <TableCell align='center'>{clickedBike.bikeModel}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Brand :  </TableCell>
                                            <TableCell align='center'>{clickedBike.brand} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Fuel Used :</TableCell>
                                            <TableCell align='center'>{clickedBike.fuel} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Bike Color : </TableCell>
                                            <TableCell align='center'>{clickedBike.color}</TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell align='center'>Description :  </TableCell>
                                            <TableCell align='center'>{clickedBike.description} </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align='center'>Price : </TableCell>
                                            <TableCell align='center'>{clickedBike.price} Rs/Hr </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Grid>

                        <BookingButton bikeId={clickedBike._id} bikes={bikes} />
                    </Grid>
                </Box>
            </Box>
        </Box><Footer />
        </>
    );
}

export default SingleBikeView;