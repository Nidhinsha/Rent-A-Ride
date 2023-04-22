import React from 'react'
import BasicModal from '../BasicModal/BasicModal'
import { Box, Button, Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import { userCancelBookedBikeAction } from '../../Redux/Actions/userActions'

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
                handleCancelRide(bikeId, bookingId)
              }}
            >
              cancel ride
            </Button>
          </Grid>
        </Box>
      }
    >

    </BasicModal>
  )
}

export default CancelRideModal
