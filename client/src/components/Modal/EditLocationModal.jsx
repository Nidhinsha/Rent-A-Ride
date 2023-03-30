import React, { useState } from 'react'
import BasicModal from '../BasicModal/BasicModal'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { adminAddLocationAction, adminEditLocation } from '../../Redux/Actions/adminActions';

// yup for autheticate the location valid or not 

const schema = yup.object().shape({
    location: yup
        .string("Location should be a string")
        .min(5, "location should hae min length of 5")
        .max(20, 'location should have max length of 20')
        .required("location is required")
})

function EditLocationModal({ open, onClose, locationId }) {
    console.log(locationId,'id form loc page');
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

        dispatch(adminEditLocation(locationId,location))
        console.log('kk', data.location);
    }

    return (
        <BasicModal
            open={open}
            onClose={onClose}
            title="Edit Location"
            content={
                <Box
                    component="form" onSubmit={handleSubmit(submitHandler)}>

                    <TextField
                        id="outlined-basic"
                        label="Outlined"
                        variant="outlined"
                        name='location'
                        error={!!errors.location}
                        helperText={errors.location ? errors.location.message : ""}
                        {...register("location")}
                    />
                    <Box>
                        <Button
                            variant="outlined"
                            type='submit'
                        >
                            Add
                        </Button>
                    </Box>
                    <Box>

                    <Button
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    </Box>
                </Box>
            }
        >

        </BasicModal>
    )
}

export default EditLocationModal