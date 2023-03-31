import React from 'react';
import { Grid, TextField, Box, Typography, InputAdornment, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Loading from '../../../components/Loading/Loading'
import Carousel from 'react-bootstrap/Carousel';
import NavBar from '../../../components/NavBar/NavBar';


function Login() {

    return (
        <Box>
            <NavBar/>
        <Box display="flex" justifyContent="center" alignItems="center" p={5} >
            <Box boxShadow={3} borderRadius={4} p={5} m={1}>
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Carousel variant="dark">
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://cdn.discordapp.com/attachments/1008571132938555432/1089765405301669919/pekka_a_person_sitting_on_a_scooter_with_color_light_blue_and_b_555f7a57-94cd-4851-95a9-8dbbe7933355.png"
                                    alt="First slide"
                                />
                                {/* <Carousel.Caption>
                                    <h5>First slide label</h5>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://cdn.discordapp.com/attachments/1008571132938555432/1089765405301669919/pekka_a_person_sitting_on_a_scooter_with_color_light_blue_and_b_555f7a57-94cd-4851-95a9-8dbbe7933355.png"
                                    alt="Second slide"
                                />
                                {/* <Carousel.Caption>
                                    <h5>Second slide label</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://cdn.discordapp.com/attachments/1008571132938555432/1089765405301669919/pekka_a_person_sitting_on_a_scooter_with_color_light_blue_and_b_555f7a57-94cd-4851-95a9-8dbbe7933355.png"
                                    alt="Third slide"
                                />
                                {/* <Carousel.Caption>
                                    <h5>Third slide label</h5>
                                    <p>
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                    </p>
                                </Carousel.Caption> */}
                            </Carousel.Item>
                        </Carousel>
                          
                    </Grid>
                    <Grid item xs={12} md={6} direction="column" alignItems="flex-end">
                        <Box>
                            <Typography variant="h5" align="center" sx={{ mt: 7 }}>
                                Bike Details
                            </Typography>
                        </Box>

                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" boxShadow={3} borderRadius={4} sx={{ mt: 7 }}>

                            <Table sx>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center'>Bike Name : RX 100</TableCell>
                                        <TableCell align='center'>Bike Name : RX 100</TableCell>
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='center'>Bike Model : 560 px</TableCell>
                                        <TableCell align='center'>Bike Model : 560 px</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center'>Brand : Yamaha </TableCell>
                                        <TableCell align='center'>Brand : Yamaha </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center'>Fuel Used : Petrol </TableCell>
                                        <TableCell align='center'>Fuel Used : Petrol </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center'>Bike Color : Black </TableCell>
                                        <TableCell align='center'>Bike Color : Black </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center'>Type : Assured </TableCell>
                                        <TableCell align='center'>Type : Assured </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align='center' >Price : 100 Rs/Hr </TableCell>
                                        <TableCell align='center'>Price : 100 Rs/Hr </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
                   
        </Box>
    );
}

export default Login;