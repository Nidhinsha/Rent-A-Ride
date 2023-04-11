import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DescriptionIcon from '@mui/icons-material/Description';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function SecondSection() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Container sx={{mt:4}}>
            <Box>
                <Typography variant="h5" textAlign='center' >It's Really Easier To Rent And Sell</Typography>
            </Box>
            <Box sx={{mt:4}}>
                <Typography variant="h6" textAlign='center' >We offer bikes and electric scooters for renting at low prices</Typography>
            </Box>
            <Container maxWidth="lg" sx={{mt:5}}>
                <Box sx={{ display: 'flex', gap: '20px' }}>
                    <Box>
                        <Card sx={{ maxWidth: 350 }}>
                            <CardHeader
                                // avatar={
                                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                //         R
                                //     </Avatar>
                                // }
                                // action={
                                //     <IconButton aria-label="settings">
                                //         <MoreVertIcon />
                                //     </IconButton>
                                // }
                                title="Shrimp and Chorizo Paella"
                                subheader="model brand is duke"
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://yorindia.com/backend/web/imageupload/PEUVgxVeyz0ZRLv-4BRBlhxrVj6cn8Rs.jpg"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body1" color="text.secondary">
                                   fule type : petrol 
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                   description : This impressive paella .
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Rent from : 28/hourly
                                </Typography>
                               
                                <Button sx={{mt:2}} fullWidth variant="contained">Book Now</Button>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <Card sx={{ maxWidth: 350 }}>
                            <CardHeader
                                // avatar={
                                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                //         R
                                //     </Avatar>
                                // }
                                // action={
                                //     <IconButton aria-label="settings">
                                //         <MoreVertIcon />
                                //     </IconButton>
                                // }
                                title="Shrimp and Chorizo Paella"
                                subheader="model brand is duke"
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://yorindia.com/backend/web/imageupload/PEUVgxVeyz0ZRLv-4BRBlhxrVj6cn8Rs.jpg"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body1" color="text">
                                   fule type : petrol 
                                </Typography>
                                <Typography variant="body1" color="text">
                                   description : This impressive paella .
                                </Typography>
                                <Typography variant="body1" color="text">
                                    Rent from : <b> <span style={{ color: 'black' }}>28/hr</span> </b>
                                </Typography>
                               
                                <Button sx={{mt:2}} fullWidth variant="contained">Book Now</Button>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <Card sx={{ maxWidth: 350 }}>
                            <CardHeader
                                // avatar={
                                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                //         R
                                //     </Avatar>
                                // }
                                // action={
                                //     <IconButton aria-label="settings">
                                //         <MoreVertIcon />
                                //     </IconButton>
                                // }
                                title="Shrimp and Chorizo Paella"
                                subheader="model brand is duke"
                            />
                            <CardMedia
                                component="img"
                                height="194"
                                image="https://yorindia.com/backend/web/imageupload/PEUVgxVeyz0ZRLv-4BRBlhxrVj6cn8Rs.jpg"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body1" color="text.secondary">
                                   fule type : petrol 
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                   description : This impressive paella .
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Rent from : <b>  28/hourly</b>
                                </Typography>
                               
                                <Button sx={{mt:2}} fullWidth variant="contained">Book Now</Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
                {/* <Container maxWidth="lg">
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                        <Button variant="outlined">Start your search</Button>
                    </Box>
                </Container> */}

            </Container>
        </Container>
    )
}

export default SecondSection
