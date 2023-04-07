import React, { useState } from 'react'
import BasicModal from '../BasicModal/BasicModal'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { adminAddCouponAction, adminEditCouponAction } from '../../Redux/Actions/adminActions';

// yup for autheticate the location valid or not 

const schema = yup.object().shape({
    couponName: yup
        .string("couponName should be a string")
        .min(5, "couponName should hae min length of 5")
        .max(20, 'couponName should have max length of 20')
        .required("couponName is required"),
    couponCode: yup
        .string("couponCode should be a string")
        .min(5, "couponCode should hae min length of 5")
        .max(20, 'couponCode should have max length of 20')
        .required("couponCode is required"),
})

function EditCouponModal({ open, onClose,couponId }) {

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const submitHandler = (data) => {
        console.log(data,'coupon data');
        const couponName = data.couponName
        const couponCode = data.couponCode

        dispatch(adminEditCouponAction(couponId,couponName, couponCode))
        // console.log('kk', data.location);
        onClose(true)
    }

    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Edit Coupons"
            content={
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}
                // component="form" onSubmit={handleSubmit(submitHandler)}
                >
                    <form style={{ width: '100%' }} onSubmit={handleSubmit(submitHandler)}>



                        <TextField
                            id="outlined-basic"
                            label="couponName"
                            variant="outlined"
                            name='couponName'
                            style={{ margin: '8px', width: '100%' }}
                            fullWidth
                            required
                            error={!!errors.couponName}
                            helperText={errors.couponName ? errors.couponName.message : ""}
                            {...register("couponName")}
                        />
                        <TextField
                            id="outlined-basic"
                            label="couponCode"
                            variant="outlined"
                            name='couponCode'
                            style={{ margin: '8px', width: '100%' }}
                            fullWidth
                            required
                            error={!!errors.couponCode}
                            helperText={errors.couponCode ? errors.couponCode.message : ""}
                            {...register("couponCode")}
                        />
                        <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>

                            <Button
                                variant="outlined"
                                color="primary"
                                style={{ marginRight: '8px' }}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                                Update Coupon
                            </Button>
                        </Box>
                    </form>
                </Box>
            }
        >

        </BasicModal>
    )
}

export default EditCouponModal
