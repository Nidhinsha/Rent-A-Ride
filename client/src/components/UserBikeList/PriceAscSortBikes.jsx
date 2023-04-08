
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { Button } from 'primereact/button';
import { Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import BookingButton from '../Button/BookingButton/BookingButton';

function PriceAscSortBikes({priceAsc}) {
    console.log('priceAsc',priceAsc);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const bikes = useSelector((state) => state.userGetBikeReducer)
    const { bikesDataLoading, bikesData, bikesDataError } = bikes
    console.log('bikedata in asc',bikesData);
    console.log('ggg');

    const ascending = priceAsc ? priceAsc.sort((a,b)=>a.price - b.price) :"error"

    return (
        <>
            <Box>
                <div className='d-flex flex-wrap justify-content-center  '>
                    {
                        bikesDataLoading ? <Loading /> :
                        ascending ? ascending.map((data, index) => {
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

                                                <Typography variant="h6" color="text.secondary" fontWeight="bold" textAlign='center'>
                                                    Rent Now @ Price : {data.price} /hr
                                                </Typography>

                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                           <BookingButton onClick={(e)=>navigate("/booking",{ state: { bikesData,bikeName: data.bikeName  } })}/>

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

export default PriceAscSortBikes