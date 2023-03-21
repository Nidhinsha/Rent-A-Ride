import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material'
import SideBar from '../../../components/SideBar/SideBar';
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
import InputLabel from '@mui/material/InputLabel';
function AddBike() {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    return (
        <div className='shadow-lg'>
            <Box sx={{ display: 'flex', justifyContent: 'center', m: 5 }} >

                <SideBar />

                <Box
                    sx={{
                        '& .MuiTextField-root': { mt: 5, width: '100%' },
                    }}

                >

                    <TextField sx={{ mr: 2 }}
                        required
                        id="outlined-required"
                        label="Bine Name"

                    />
                    <TextField sx={{ mr: 2 }}
                        required
                        id="outlined-required"
                        label="Bike Model"

                    />


                    <TextField sx={{ mr: 2 }}
                        required
                        id="outlined-required"
                        label="Engine Number"

                    />
                    <TextField sx={{ mr: 2 }}
                        required
                        id="outlined-required"
                        label="Brand"

                    />


                    <TextField sx={{ mr: 2 }}
                        required
                        id="outlined-required"
                        label="Color"
                    />
                    <TextField sx={{ mr: 2 }}
                        required
                        id="outlined-required"
                        label="Fuel"
                    />

                    <TextField sx={{ mr: 2 }}
                        required
                        id="outlined-required"
                        label="Price"
                        type="number"
                    />
                    <TextField sx={{ mr: 2 }}
                        type="file"
                        helperText="Please select the image"
                    />
                    <Button variant="outlined">Outlined</Button>

                </Box>

            </Box>

        </div>

    )
}

export default AddBike
