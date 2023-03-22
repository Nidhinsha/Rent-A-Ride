import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material'
import SideBar from '../../../components/SideBar/SideBar';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { adminAddBikeAPI } from '../../../Api/Admin/ApiCalls';

function AddBike() {


    const [bikeName, setBikeName] = useState('')
    const [bikeModel, setModel] = useState('')
    const [engineNumber, setEngineNumber] = useState('')
    const [brand, setBrand] = useState('')
    const [fuel, setFuel] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [color, setColor] = useState('')
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleSubmit =async()=>{
        console.log(bikeName,bikeModel,engineNumber,brand,fuel,description,price,color,'form data for add bike the ');
        setLoading(true)

        // for using the form data
         
        const formData = new FormData()

        // for image
        images.forEach((value)=>{
            formData.append("images",value)
        })

        // the form data 
        formData.append("bikeName",bikeName)
        formData.append("bikeModel",bikeModel)
        formData.append("engineNumber",engineNumber)
        formData.append("fuel",fuel)
        formData.append("brand",brand)
        formData.append("price",price)
        formData.append("color",color)
        formData.append("description",description)

        adminAddBikeAPI(formData).then((data)=>{
            console.log(data.data,'form data response');
        })
    }

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
            <DrawerHeader />
            <Box sx={{ display: 'flex', justifyContent: 'center', m: 5 }} >
                <SideBar />
                <Box
                    sx={{
                        '& .MuiTextField-root': { mt: 5, width: '100%' },
                    }}>

                    <h3>ADD BIKE</h3>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Bike Name"
                            onChange={(e) => setBikeName(e.target.value)}

                        />
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Bike Model"
                            onChange={(e) => setModel(e.target.value)}

                        />

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Engine Number"
                            onChange={(e) => setEngineNumber(e.target.value)}

                        />
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Brand"
                            onChange={(e) => setBrand(e.target.value)}

                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Color"
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Fuel"
                            onChange={(e) => setFuel(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Price"
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}

                        />
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Description"
                            multiline
                            maxRows={4}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            helperText="Please select the image"
                            onChange={(e) => setImages([...images, e.target.files[0]])}
                        />
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            helperText="Please select the image"
                            onChange={(e) => setImages([...images, e.target.files[0]])}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            helperText="Please select the image"
                            onChange={(e) => setImages([...images, e.target.files[0]])}
                        />
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            helperText="Please select the image"
                            onChange={(e) => setImages([...images, e.target.files[0]])}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px' }}>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#6366f1' }}
                            sx={{
                                mr: 2, mt: 5, width: '100%'
                            }}
                            
                            onClick={handleSubmit}
                            >
                            ADD BIKE
                        </Button>
                    </div>

                </Box>

            </Box>

        </div>

    )
}

export default AddBike
