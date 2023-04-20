import { Box, Typography } from '@mui/material'
import { Button } from 'primereact/button'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import WalletIcon from '@mui/icons-material/Wallet';
import { useDispatch, useSelector } from 'react-redux';
import { userGetWalletAction } from '../../Redux/Actions/userActions';

function WalletCard({userId}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wallet = useSelector((state)=>state.userGetWalletReducer?.walletData)

  useEffect(()=>{
    dispatch(userGetWalletAction(userId))
  },[])

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
               <Typography>wallet Amount : <span>{wallet?.walletAmount}$</span> </Typography> 
            </Box>
            <Box>
                
                <Button 
                fullWidth 
                variant='contained'
                onClick={(e)=>{
                  navigate('/wallet',{state:{wallet}})
                }}
                 ><WalletIcon />  Wallet</Button>
                
            </Box>

        </div>
    </>
  )
}

export default WalletCard
