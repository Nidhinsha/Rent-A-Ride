import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import NavBar from '../../../components/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { userGetBikeAction } from '../../../Redux/Actions/userActions';
import Loading from '../../../components/Loading/Loading';
import { Button } from 'primereact/button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import { Box } from '@mantine/core';
import { userBikeSearchAction } from '../../../Redux/Actions/userActions';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Bikes() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const bikes = useSelector((state) => state.userGetBikeReducer)
    const { bikesDataLoading, bikesData, bikesDataError } = bikes
    console.log(bikesData, 'jjjjjjjjjjjjjjjjjjj');

    useEffect(() => {
        dispatch(userGetBikeAction())
    }, [])

    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userBikeSearchAction(searchTerm))
        console.log('hey', searchTerm)
    }
    return (
        <>
            <NavBar />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',marginBottom:50 }}>
                <h1>Rent-A-Ride Bikes For You</h1>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <Box component='form' onSubmit={handleSubmit}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%' }}

                >

                    <TextField
                        label="Search"
                        name='search'
                        value={searchTerm}
                        fullWidth

                        onChange={(e) => setSearchTerm(e.target.value)}

                        sx={{ mb: 2 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start" style={{ cursor: 'pointer' }} onClick={handleSubmit}>
                                    <ImageSearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        helperText='enter the text here..'
                    />
                </Box>
            </Box>
                <Box>
            <div className='d-flex flex-wrap justify-content-center  '>
                    {
                        bikesDataLoading ? <Loading /> :
                            bikesData ? bikesData.map((data, index) => {
                                return (
                                    <Card key={index} sx={{ height: 350, width: 350, m: 3, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>
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
                                                onClick={(e) => navigate('/single-bike-view', { state: { bikesData } })}
                                            />
                                            <CardContent>
                                                {/* <Typography gutterBottom variant="h4" component="div" >
                                                    {data.bikeName}
                                                </Typography> */}
                                                {/* <Typography variant="h6" color="text.secondary" textAlign='center' fontWeight="bold" >
                                                    Model : {data.bikeModel}
                                                </Typography>
                                                <Typography variant="h6" color="text.secondary" fontWeight="bold" textAlign='center'>
                                                    Brand : {data.brand}
                                                </Typography> */}
                                                {/* <Typography variant="h6" color="text.secondary" fontWeight="bold" textAlign='center'>
                                                    Description : {data.description}
                                                </Typography> */}
                                                <Typography variant="h6" color="text.secondary" fontWeight="bold" textAlign='center'>
                                                   Rent Now @ Price : {data.price} /hr
                                                </Typography>
                                              
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button  label="Book Now" aria-label="Submit" icon="pi pi-shopping-bag"  style={{ width: '100%',fontSize:'large' }}
                                             />
                                            {/* <Button variant="contained" endIcon={<SendIcon />}>
                                            Book
                                        </Button> */}
                                        </CardActions>
                                    </Card>
                                )
                            }) : ""
                    }
            </div>
                </Box>
        </>
    )
}

export default Bikes