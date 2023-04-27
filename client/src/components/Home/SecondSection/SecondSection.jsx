import { Box, Button, Container, Grid, Typography } from '@mui/material'
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
import BikeCards from '../../Cards/BikeCards';

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
                <Grid  className='d-flex flex-wrap justify-content-center' sx={{gap:'25px'}} >
                    <BikeCards/>
                </Grid>
            </Container>
        </Container>
    )
}

export default SecondSection
