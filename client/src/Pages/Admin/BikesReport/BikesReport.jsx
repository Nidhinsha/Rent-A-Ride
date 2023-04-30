import React, { useEffect } from 'react'
import SideBar from '../../../components/SideBar/SideBar';
import { Box,Tab, Tabs, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { bikeReportDataAction } from '../../../Redux/Actions/adminActions';
import AllReport from '../../../components/BikeReport/AllReport';
import WeeklyReport from '../../../components/BikeReport/WeeklyReport';
import YearlyReport from '../../../components/BikeReport/YearlyReport';
import MonthlyReport from '../../../components/BikeReport/MonthlyReport';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


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




function BikesReport() {

  const dispatch = useDispatch()

  const bikeReport = useSelector((state)=>state.bikeReportDataReducer)
  const {loading,reportData,reportDataError} = bikeReport

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    dispatch(bikeReportDataAction())
  },[])

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
          <DrawerHeader />
          <Box sx={{ width: '100%' }}>
            <Typography variant='h5'>Bikes Report</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs aria-label="basic tabs example" value={value} onChange={handleChange} centered>
                <Tab label="All Report" />
                <Tab label="Weekly Report"/>
                <Tab label="Monthly Report" />
                <Tab label="Yearly Report"/>
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <AllReport bikeReport={reportData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <WeeklyReport bikeReport={reportData}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <MonthlyReport bikeReport={reportData}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <YearlyReport bikeReport={reportData}/>
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default BikesReport
