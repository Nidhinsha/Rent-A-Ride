import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { userAddBikeAPI } from '../../../Api/User/ApiCalls';
import NavBar from '../../../components/NavBar/NavBar';
import { FormHelperText } from '@mui/material'
import { useForm } from "react-hook-form"
import Footer from '../../../components/Home/Footer/Footer';
import Swal from 'sweetalert2';

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

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async () => {
        setLoading(true)

        // for using the form data

        const formdata = new FormData()

        // for image
        images.forEach((value) => {
            formdata.append("images", value)
        })

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
            setLoading(false)

            Swal.fire(
                'Congrats!',
                'You booking is successfull!',
                'success'
              ).then(() => {
                navigate('/rented-bikes')
              })
        })
            .catch((error) => {
                setLoading(false)
            })
    }

    return (
        <>
            <NavBar />
            <Box sx={{ display: 'flex', justifyContent: 'center', width: "100%", }} >

                <Box
                    sx={{
                        '& .MuiTextField-root': { mt: 5,ml:3, width: '100%' },boxShadow:2
                    }}
                    component="form" onSubmit={handleSubmit(onSubmit)}
                >

                    <h3 sx={{ml:3}}>ADD BIKE</h3>

                    {sucess ? <Alert severity="success">Done Bike Added !!!</Alert> : ''}

                    <div style={{ display: 'flex', flexDirection: 'row' }} >

                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Owner Name"
                            {...register("ownerName",
                                {
                                    required: "This is required", minLength: 3,maxLength:8
                                })}
                            onChange={(e) => setOwnerName(e.target.value)}
                            helperText={errors.ownerName && <div style={{ color: 'red' }}>Please check the owner name</div>}
                        />

                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Bike Name"
                            {...register("bikeName",
                                {
                                    required: "This is required", minLength: 3,maxLength:8
                                })}
                            onChange={(e) => setBikeName(e.target.value)}
                            helperText={errors.bikeName && <div style={{ color: 'red' }}>Please check the bike name</div>}
                        />

                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Bike Model"
                            {...register("bikeModel",
                                {
                                    required: "This is required", minLength: 3,maxLength:8
                                })}

                            onChange={(e) => setModel(e.target.value)}
                            helperText={errors.bikeModel && <div style={{ color: 'red' }}>Please check the bike model</div>}
                        />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Engine Number"
                            {...register("engineNumber",
                                {
                                    required: true, minLength: 3,maxLength:8
                                })}

                            onChange={(e) => setEngineNumber(e.target.value)}
                            helperText={errors.engineNumber && <div style={{ color: 'red' }}>Please check the engine number</div>} />

                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Brand"
                            {...register("brand",
                                {
                                    required: true, minLength: 3,maxLength:8
                                })}
                            onChange={(e) => setBrand(e.target.value)}
                            helperText={errors.engineNumber && <p style={{ color: 'red' }}>Please check the brand</p>}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Color"
                            {...register("color",
                                {
                                    required: true, minLength: 3,maxLength:8
                                }
                            )}
                            onChange={(e) => setColor(e.target.value)}
                            helperText={errors.color && <div style={{ color: 'red' }}>Please check the color</div>}
                        />


                        <FormControl fullWidth sx={{ marginTop: "40px", mr: 2 }}>
                            <InputLabel id="demo-simple-select-label">Fuel</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fuel}
                                label="Fuel"
                                {...register("fuel",
                                    {
                                        required: true, minLength: 3
                                    }
                                )}

                                onChange={(e) => setFuel(e.target.value)}
                            >
                                <MenuItem value="petrol">Petrol</MenuItem>
                                <MenuItem value="diesel">Diesel</MenuItem>
                                <MenuItem value="electric">Electric</MenuItem>
                            </Select>
                            {errors.fuel && <p style={{ color: 'red' }}>Please check the fuel type</p> ? errors.fuel && <small style={{ color: 'red' }}>Please enter the fuel type</small> : <FormHelperText></FormHelperText>}
                        </FormControl>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Price"
                            type="number"
                            {...register("price",
                                {
                                    required: true, minLength: 2, maxLength: 3
                                }
                            )}
                            onChange={(e) => setPrice(e.target.value)}
                            helperText={errors.price && <p style={{ color: 'red' }}>Please check the price</p>}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Description"
                            multiline
                            maxRows={4}
                            {...register("description",
                                {
                                    required: true, minLength: 3,maxLength:100
                                }
                            )}

                            onChange={(e) => setDescription(e.target.value)}
                            helperText={errors.description && <p style={{ color: 'red' }}>Please check the description</p>}
                        />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            inputProps={{
                                accept: '.jpg, .jpeg, .png'
                              }}
                            helperText={errors.image1 && <p style={{ color: 'red' }}>Please check the choosen image</p> ? errors.image1 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}

                            onChange={(e) => setImages([...images, e.target.files[0]])} />
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            inputProps={{
                                accept: '.jpg, .jpeg, .png'
                              }}
                            helperText={errors.image2 && <p style={{ color: 'red' }}>Please check the choosen image</p> ? errors.image2 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}
                            {...register("image2",
                                {
                                    required: true, minLength: 1
                                })}
                            onChange={(e) => setImages([...images, e.target.files[0]])} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            inputProps={{
                                accept: '.jpg, .jpeg, .png'
                              }}
                            helperText={errors.image3 && <p style={{ color: 'red' }}>Please check the choosen image</p> ? errors.image3 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}
                            {...register("image3",
                                {
                                    required: true, minLength: 1
                                })}
                            onChange={(e) => setImages([...images, e.target.files[0]])} />
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            inputProps={{
                                accept: '.jpg, .jpeg, .png'
                              }}
                            helperText={errors.image4 && <p style={{ color: 'red' }}>Please check the choosen image</p> ? errors.image4 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}
                            {...register("image4",
                                {
                                    required: true, minLength: 1
                                })}
                            onChange={(e) => setImages([...images, e.target.files[0]])} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px' }}>

                        {
                            loading ? <Button
                                variant="contained"
                                style={{ backgroundColor: '#6366f1' }}
                                sx={{
                                    mr: 2, mt: 5, width: '100%'
                                }}
                                type='submit'
                                disabled

                            >
                                <CircularProgress color="inherit" />

                            </Button> :
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: '#6366f1' }}
                                    sx={{
                                        mr: 2,ml:3, mt: 5, width: '100%'
                                    }}
                                    type='submit'
                                    onClick={handleSubmit}
                                >
                                    ADD BIKE
                                </Button>
                        }

                    </div>

                </Box>

            </Box>

          <Footer/>
        </>

    )
}

export default RentBike
