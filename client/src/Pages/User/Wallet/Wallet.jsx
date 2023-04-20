import { Box, Container, Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { Button } from 'primereact/button';
import { Link, useLocation } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Home/Footer/Footer';
import WalletTable from '../../../components/Table/WalletTable';

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
                    <WalletTable walletHistory={walletHistory} />
                </Box>
            </Container>
            <Footer />
        </>
    )
}

export default Wallet
