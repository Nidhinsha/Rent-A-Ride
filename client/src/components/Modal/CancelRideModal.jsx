import React from 'react'
import BasicModal from '../BasicModal/BasicModal'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { userCancelBookedBikeAction } from '../../Redux/Actions/userActions'
import CancelIcon from '@mui/icons-material/Cancel';
import StopIcon from '@mui/icons-material/Stop';


function CancelRideModal({ open, onClose, bookingId, bikeId, userId, startTime, endTime, price }) {
  const dispatch = useDispatch()
  const handleCancelRide = (bikeId,bookingId) => {
    dispatch(userCancelBookedBikeAction( bikeId,bookingId, startTime, endTime, userId,price))
    onClose()
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
                    handleCancelRide(bikeId, bookingId)
                  }}
                >
                  Cancel Ride
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      }
    >

    </BasicModal>
  )
}

export default CancelRideModal
