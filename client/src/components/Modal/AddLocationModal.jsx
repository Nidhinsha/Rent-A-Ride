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
import { adminAddLocationAction } from '../../Redux/Actions/adminActions';

// yup for autheticate the location valid or not 

const schema = yup.object().shape({
    location: yup
        .string("Location should be a string")
        .min(5, "location should hae min length of 5")
        .max(20, 'location should have max length of 20')
        .required("location is required")
})

function AddLocationModal({ open, onClose }) {

    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const submitHandler = (data) => {
        const location = data.location

        dispatch(adminAddLocationAction(location))
        onClose(true)
    }

    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Add Location "
            content={
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}
                    // component="form" onSubmit={handleSubmit(submitHandler)}
                    >
                      <form style={{ width: '100%' }} onSubmit={handleSubmit(submitHandler)}>

                     

                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        name='location'
                        style={{ margin: '8px', width: '100%' }}
                        fullWidth
                        required
                        error={!!errors.location}
                        helperText={errors.location ? errors.location.message : ""}
                        {...register("location")}
                    />
                    <Box  style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        
                       <Button
                       variant="outlined"
                       color="primary"
                       style={{ marginRight: '8px' }}
                       onClick={onClose}
                     >
                       Cancel
                     </Button>
                     <Button variant="contained" color="primary" type="submit">
                       Add
                     </Button>
                     </Box>
                    </form>
                </Box>
            }
        >

        </BasicModal>
    )
}

export default AddLocationModal
