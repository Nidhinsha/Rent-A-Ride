import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { userGetBookedBikeAction } from '../../../Redux/Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../../../components/NavBar/NavBar';
import { Box, Button, Container, Tab, Tabs, Tooltip } from '@mui/material';
import Footer from '../../../components/Home/Footer/Footer';
import AllRides from '../../../components/BookedBikes/AllRides';
import OnRides from '../../../components/BookedBikes/OnRides';
import CompletedRides from '../../../components/BookedBikes/CompletedRides';
import PendingRides from '../../../components/BookedBikes/PendingRides';
import CancelledRides from '../../../components/BookedBikes/CancelledRides';
import PropTypes from 'prop-types';

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


function BookedBikes() {
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const userId = JSON.parse(localStorage.getItem("userInfo")).id
  const bookedBike = useSelector((state) => state.userGetBookedBikeReducer.bookedBikeData)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userGetBookedBikeAction(userId))
  }, [])


  return (
    <>
      <NavBar />
      {/* <div> */}
      <Container maxWidth="lg" >
        <Container >
          <Typography variant='h5'>Booked Bikes</Typography>
        </Container>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs aria-label="basic tabs example" value={value} onChange={handleChange} centered>
              <Tab label="All Rides" />
              <Tab label="on Ride" />
              <Tab label="Complted Ride" />
              <Tab label="Pending Ride" />
              <Tab label="Cancel Ride" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AllRides data={bookedBike} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OnRides data={bookedBike} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CompletedRides data={bookedBike} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PendingRides data={bookedBike} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <CancelledRides data={bookedBike} />
          </TabPanel>
        </Box>
        <Container fixed sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default BookedBikes
