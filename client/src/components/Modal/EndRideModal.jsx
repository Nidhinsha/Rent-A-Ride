import React from 'react';
import BasicModal from '../BasicModal/BasicModal';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { userEndBookingAPI } from '../../Api/User/ApiCalls';
import { userEndBookedBikeAction } from '../../Redux/Actions/userActions';
import CancelIcon from '@mui/icons-material/Cancel';
import StopIcon from '@mui/icons-material/Stop';

function EndRideModal({ open, onClose, bookingId, bikeId, userId, startTime, endTime, price }) {

  const dispatch = useDispatch();
    
  const handleEndRide = (bikeId, bookingId) => {
    userEndBookingAPI(bikeId, bookingId, startTime, endTime, userId, price).then((data) => {
      dispatch(userEndBookedBikeAction(data.data));
      onClose();
    });
  }

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      content={
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Are you sure?
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  startIcon={<CancelIcon />}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  startIcon={<StopIcon />}
                  onClick={(e) => {
                    handleEndRide(bikeId, bookingId)
                  }}
                >
                  End Ride
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      }
    />
  );
}

export default EndRideModal;
