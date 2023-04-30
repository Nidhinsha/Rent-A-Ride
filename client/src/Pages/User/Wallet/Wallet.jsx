import { Box, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import {  useLocation } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Home/Footer/Footer';
import WalletTable from '../../../components/Table/WalletTable';

function Wallet() {
    const location = useLocation()
    const walletHistory = location.state.wallet?.walletHistory

    return (
        <>
            <NavBar />
            <Container>
                <Box>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>Wallet Histroy</Typography>
                </Box>
                <Divider />
                <Box>
                    {
                        walletHistory 
                        ? <WalletTable walletHistory={walletHistory} />
                        : <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <img src={require('../../../assests/images/walletHistroy.jpg')} alt="wallet history" style={{ maxWidth: '100%', maxHeight: '100%', width: '300px', height: '300px' }}/>
                        </Box>
                    }
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default Wallet
