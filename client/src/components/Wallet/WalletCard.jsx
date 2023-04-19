import { Box, Typography } from '@mui/material'
import { Button } from 'primereact/button'
import React from 'react'
import { Link } from 'react-router-dom'
import WalletIcon from '@mui/icons-material/Wallet';

function WalletCard() {
  return (
    <>
      <div className="d-flex flex-column align-items-center text-center p-3 py-5 shadow p-3 mb-5 bg-white rounded">
            <Box>
                <Typography >
                    <WalletIcon />
                   <h4>Wallet</h4> 
                </Typography>
            </Box>
            <Box>
               <Typography>wallet Amount : <span>50$</span> </Typography> 
            </Box>
            <Box>
                <Link to='/wallet'>
                <Button 
                fullWidth 
                variant='contained'
                 ><WalletIcon />  Wallet</Button>
                </Link>
            </Box>

        </div>
    </>
  )
}

export default WalletCard
