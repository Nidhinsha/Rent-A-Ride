import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../../../components/NavBar/NavBar';
// import { getAccepted, getRentedBikesAction } from '../../../REDUX/Actions/USER_ACTIONS/getRentedBikes'
import {userGetAcceptedBikes,userGetRejectedBikes,userGetPendingBikes,userGetAllRentedBikes} from '../../../Redux/Actions/userActions'
import Figure from 'react-bootstrap/Figure';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Loading from '../../../components/Loading/Loading';
import Footer from '../../../components/Home/Footer/Footer';
import AllRentedBikes from '../../../components/RentedBikes/AllRentedBikes';
import RejectedReq from '../../../components/RentedBikes/RejectedReq';
import AcceptedReq from '../../../components/RentedBikes/AcceptedReq';
import PendingReq from '../../../components/RentedBikes/PendingReq';

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

function RentedBikes() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dispatch = useDispatch()

    const getAcceptedData = () => {
       dispatch(userGetAcceptedBikes()) 
    }
    const getPendingData = () => {
       dispatch(userGetPendingBikes()) 
    }

    const getRejectedData = () => {
        dispatch(userGetRejectedBikes())
    }


    const rentedBikes = useSelector((state) => state.userGetAllRentedBikesReducer.rentedBikesData)

    const rejected = useSelector((state) => state.userGetRejectedBikeReducer.rejectedBikesData)

    const pending = useSelector((state) => state.userGetPendingBikeReducer.pendingBikesData)

    const accepted = useSelector((state) => state.userGetAcceptedBikeReducer.acceptedBikesData)


    useEffect(() => {
        dispatch(userGetAllRentedBikes())
    }, [dispatch])

    return (
        <>
            <NavBar />
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2} className='mt-3'>
                    <Item><h3>Rented Bikes</h3></Item>
                  
                </Stack>
            </Box>

            <Box sx={{ width: '100%' }} className='mt-3 container'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="All " />

                        <Tab label="Accepted Requests" onClick={getAcceptedData} ></Tab>
                        <Tab label="Pending Requests" onClick={getPendingData} />
                        <Tab label="Rejected Requests" onClick={getRejectedData} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <AllRentedBikes rentedBikes={rentedBikes}/>
                </TabPanel>

                <TabPanel value={value} index={1}>
                  <AcceptedReq acceptedReq={accepted}/>
                </TabPanel>

                <TabPanel value={value} index={2}>
                <PendingReq pendingReq={pending}/>
                </TabPanel>

                <TabPanel value={value} index={3}>
                <RejectedReq rejectedReq={rejected} />
                </TabPanel>
            </Box>
            <Footer/>
        </>
    )
}


export default RentedBikes
