import React from 'react'
import BasicModal from '../BasicModal/BasicModal'
import { Box, Button, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { userEndBookingAPI } from '../../Api/User/ApiCalls'
import { userEndBookedBikeAction } from '../../Redux/Actions/userActions'

function EndRideModal({ open, onClose, bookingId, bikeId, userId, startTime, endTime, price }) {

  const dispatch= useDispatch()
    
  const handleEndRide =(bikeId,bookingId)=>{
    userEndBookingAPI(bikeId,bookingId,startTime,endTime,userId,price).then((data)=>{
      dispatch(userEndBookedBikeAction(data.data))
      onClose()
    })
  }
  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="are you sure ?"
      content={
        <Box>
          <Box>are you sure ?</Box>
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="primary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Button
              variant="contained"
              color="error"
              onClick={(e) => {
                handleEndRide(bikeId, bookingId)
              }}
            >
              End Ride
            </Button>
          </Grid>
        </Box>
        }
        >

    </BasicModal>
  )
}

export default EndRideModal
