import { Box, Button } from '@mui/material';
import React from 'react'
import { useNavigate } from "react-router-dom"

function PaymentCancel() {
    const navigate = useNavigate();

    const handleProfileButtonClick = () => {
        navigate('/profile');
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box>
                <lord-icon
                    src="https://cdn.lordicon.com/vyukcgvf.json"
                    trigger="hover"
                    colors="outline:#121331,primary:#ffc738,secondary:#92140c"
                    style={{ width: '250px', height: '250px' }}>
                </lord-icon>

            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 4 }}>
                <h2>Payment Canceled</h2>
                <p>Sorry, your payment could not be processed at this time.</p>
                <Button onClick={handleProfileButtonClick}>Go to My Profile</Button>
            </Box>
        </div>
    )
}

export default PaymentCancel
