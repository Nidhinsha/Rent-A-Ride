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
            <div className='d-flex flex-wrap justify-content-center  '>
                <Box component='form' onSubmit={handleSubmit}>
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

                {
                    bikesDataLoading ? <Loading /> :
                        bikesData ? bikesData.map((data, index) => {
                            return (
                                <Card key={index} sx={{ height: 380, width: 300, m: 3, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="180"
                                            width="140"
                                            image={data.photo[0]}
                                            alt={data.bikeName} 
                                            onClick={(e)=> navigate('/single-bike-view',{state : {bikesData}})}
                                            />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" >
                                                {data.bikeName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" fontWeight="bold" >
                                                Model : {data.bikeModel}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                                Brand : {data.brand}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                                Description : {data.description}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" fontWeight="bold">
                                                Price : {data.price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button label="Book" aria-label="Submit" icon="pi pi-shopping-bag" />
                                        {/* <Button variant="contained" endIcon={<SendIcon />}>
                                            Book
                                        </Button> */}
                                    </CardActions>
                                </Card>
                            )
                        }) : ""
                }


            </div>
        </>
    )
}

export default Bikes