import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material'
import SideBar from '../../../components/SideBar/SideBar';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { userAddBikeAPI } from '../../../Api/User/ApiCalls';
import NavBar from '../../../components/NavBar/NavBar';


function RentBike() {

    const [ownerName, setOwnerName] = useState('')
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
    const [sucess, setSuccess] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async () => {
        console.log(bikeName, bikeModel, engineNumber, brand, fuel, description, price, color, images, 'form data for add bike the ');
        setLoading(true)

        // for using the form data

        const formdata = new FormData()

        // for image
        console.log(images, ';;;;');
        images.forEach((value) => {
            console.log(value)
            formdata.append("images", value)
        })


        console.log(formdata.get("images"));

        // the form data 
        formdata.append("ownerName", ownerName)
        formdata.append("bikeName", bikeName)
        formdata.append("bikeModel", bikeModel)
        formdata.append("engineNumber", engineNumber)
        formdata.append("fuel", fuel)
        formdata.append("brand", brand)
        formdata.append("price", price)
        formdata.append("color", color)
        formdata.append("description", description)

        userAddBikeAPI(formdata).then((data) => {
            console.log(data.data, 'form data response');

            // dispatch(adminAddBikeAction(data.data))
            setLoading(false)

            setSuccess(true)

            // setTimeout(()=>{
            //     Navigate("/admin/bikes",{state:{bikeAdded:true}})
            //     setSuccess(false)
            // },3000)
        })
            .catch((error) => {
                console.log("some error", error);
                setLoading(false)
            })
    }





    return (
        <>
            <NavBar />
            {/* <div className='shadow-lg'> */}


                <Box sx={{ display: 'flex', justifyContent: 'center',width:"100%" }}>

                    <Box
                        sx={{
                            '& .MuiTextField-root': { mt: 5, width: '100%' },
                        }}>

                        <h3>ADD BIKE</h3>

                        {sucess ? <Alert severity="success">This is a success alert — check it out!</Alert> : ''}

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField sx={{ mr: 2 }}
                                required
                                id="outlined-required"
                                label="Owner Name"
                                onChange={(e) => setOwnerName(e.target.value)} />
                            <TextField sx={{ mr: 2 }}
                                required
                                id="outlined-required"
                                label="Bike Name"
                                onChange={(e) => setBikeName(e.target.value)} />
                            <TextField sx={{ mr: 2 }}
                                required
                                id="outlined-required"
                                label="Bike Model"
                                onChange={(e) => setModel(e.target.value)} />

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField sx={{ mr: 2 }}
                                required
                                id="outlined-required"
                                label="Engine Number"
                                onChange={(e) => setEngineNumber(e.target.value)} />
                            <TextField sx={{ mr: 2 }}
                                required
                                id="outlined-required"
                                label="Brand"
                                onChange={(e) => setBrand(e.target.value)} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField sx={{ mr: 2 }}
                                required
                                id="outlined-required"
                                label="Color"
                                onChange={(e) => setColor(e.target.value)} />
                        

                            <FormControl fullWidth sx={{ marginTop: "40px", mr: 2 }}>
                                <InputLabel id="demo-simple-select-label">Fuel</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={fuel}
                                    label="Fuel"
                                    onChange={(e) => setFuel(e.target.value)}
                                >
                                    <MenuItem value="petrol">Petrol</MenuItem>
                                    <MenuItem value="diesel">Diesel</MenuItem>
                                    <MenuItem value="electric">Electric</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField sx={{ mr: 2 }}
                                required
                                id="outlined-required"
                                label="Price"
                                type="number"
                                onChange={(e) => setPrice(e.target.value)} />
                            <TextField sx={{ mr: 2 }}
                                required
                                id="outlined-required"
                                label="Description"
                                multiline
                                maxRows={4}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>


                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField sx={{ mr: 2 }}
                                type="file"
                                helperText="Please select the image"
                                onChange={(e) => setImages([...images, e.target.files[0]])} />
                            <TextField sx={{ mr: 2 }}
                                type="file"
                                helperText="Please select the image"
                                onChange={(e) => setImages([...images, e.target.files[0]])} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <TextField sx={{ mr: 2 }}
                                type="file"
                                helperText="Please select the image"
                                onChange={(e) => setImages([...images, e.target.files[0]])} />
                            <TextField sx={{ mr: 2 }}
                                type="file"
                                helperText="Please select the image"
                                onChange={(e) => setImages([...images, e.target.files[0]])} />
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

            {/* </div> */}
        </>

    )
}

export default RentBike
