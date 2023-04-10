import React from 'react'
import axios from "axios"
import { Button } from '@mui/material'


function StripePayButton({bookingData}) {

    const handleCheckOut=()=>{
        // need to change to correct format now just checking if it is working or not 

        axios.post('http://localhost:5000/api/user/booking-bike',{bookingData})
            .then((response)=>{
                if (response.data.url) {
                    window.location.href = response.data.url
                }
             })
             .catch((error)=>{
                console.log('eror in stripe ',error);
             })
        console.log('booking data in the stripe butn',bookingData);
    }
  return (
    <>
      <Button  fullWidth
              sx={{
                mt: 2,color:'white', backgroundColor: "#6366F1", "&.MuiButtonBase-root:hover": {
                  bgcolor: "#6366F1"
                }
              }}
              size="large"
              
      onClick={handleCheckOut}>Check Out</Button>
    </>
  )
}

export default StripePayButton
