import { Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function BookingButton({bikeId,bikes}) {
    const navigate = useNavigate()
    const { bikesDataLoading, bikesData, bikesDataError }= useSelector((state) => state.userGetBikeReducer)
    
  return (
    <Button
    label="Book Now" variant='outlined'  icon="pi pi-shopping-bag" style={{ width: '100%', fontSize: 'large' }}
    onClick={() => navigate("/booking",{ state: { bikesData,bikeId,bikes  } })}

    >
        Book Now
    </Button>
  )
}

export default BookingButton
