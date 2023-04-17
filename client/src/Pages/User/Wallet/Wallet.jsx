import { Box } from '@mui/material'
import { Typography } from 'antd'
import React from 'react'
import WalletIcon from '@mui/icons-material/Wallet';
function Wallet() {
    return (
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

        </div>
    )
}

export default Wallet
