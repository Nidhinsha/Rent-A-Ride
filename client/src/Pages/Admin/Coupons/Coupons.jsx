import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/material'
import { Container } from '@mantine/core';
import Button from '@mui/material/Button';
import SideBar from '../../../components/SideBar/SideBar';
import AddCouponModal from '../../../components/Modal/AddCouponModal';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetCouponsAction } from '../../../Redux/Actions/adminActions';
import CouponTable from '../../../components/Table/CouponTable';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

function Coupons() {
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)

    const coupons = useSelector((state) => state.adminCouponsReducer.couponData)

    useEffect(() => {
        dispatch(adminGetCouponsAction())
    }, [open])

    return (
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mr: 1 }}>
                <DrawerHeader />
                <Container sx={{ mt: 1 }} style={{ maxWidth: '100rem' }}>

                    <Box >
                        <h2>
                            Add Coupon
                        </h2>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mb: 3 }}>
                        <Button
                            onClick={(e) => setOpen(true)}
                            variant='contained'
                        >add Coupon</Button>
                        {
                            open ? <AddCouponModal open={open} onClose={() => setOpen(false)} /> : ""
                        }


                    </Box>
                    <CouponTable data={coupons} />

                </Container>
            </Box>
        </Box>
    )
}

export default Coupons
