import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
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
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import AllBikes from '../../../components/UserBikeList/AllBikes';
import PriceAscSortBikes from '../../../components/UserBikeList/PriceAscSortBikes';
import PriceDescSortBikes from '../../../components/UserBikeList/PriceDescSortBikes';

function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function Bikes() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log('eooeoeo');
        setValue(newValue);
    };

    const bikes = useSelector((state) => state.userGetBikeReducer)
    const { bikesDataLoading, bikesData, bikesDataError } = bikes
    console.log('bike data n the main',bikesData);

    useEffect(() => {
        dispatch(userGetBikeAction())
    }, [])

    const [searchTerm, setSearchTerm] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userBikeSearchAction(searchTerm))
    }
    return (
        <>
            <NavBar />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 50 }}>
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


            <Box sx={{ width: '100%' }}>
                <Box  sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs aria-label="basic tabs example" value={value} onChange={handleChange} centered>
                        <Tab label="All Bikes"  />
                        <Tab label="Low to High" />
                        <Tab label="High to Low" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <AllBikes allBikes={bikesData}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                   <PriceAscSortBikes priceAsc={bikesData}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <PriceDescSortBikes priceDesc={bikesData}/>
                </TabPanel>
            </Box>
        </>
    )
}

export default Bikes