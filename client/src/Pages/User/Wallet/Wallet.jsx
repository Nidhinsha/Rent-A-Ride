import { Box, Container, Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Button } from 'primereact/button';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Home/Footer/Footer';
import WalletTable from '../../../components/Table/WalletTable';
import { Center } from '@mantine/core';

function Wallet() {
    const location = useLocation()
    const walletHistory = location.state.wallet?.walletHistory

    console.log(walletHistory,'ealsdflsd');
 

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
