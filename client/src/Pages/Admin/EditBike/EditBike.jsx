import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, FormHelperText, Grid, styled } from '@mui/material'
import SideBar from '../../../components/SideBar/SideBar';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetLocation } from '../../../Redux/Actions/adminActions';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Figure } from 'react-bootstrap';

import { useForm } from "react-hook-form"
import { adminEditBikeAPI} from '../../../Api/Admin/ApiCalls'

function EditBike() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [images1, setImages1] = useState([])
    const [images, setImages] = useState([])
    const [bikeName, setBikeName] = useState('')
    const [bikeModel, setModel] = useState('')
    const [engineNumber, setEngineNumber] = useState('')
    const [brand, setBrand] = useState('')
    const [fuel, setFuel] = useState('')
    const [loc, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [color, setColor] = useState('')

    const [loading, setLoading] = useState(false)
    const [sucess, setSuccess] = useState(false)

    const location = useLocation()
    console.log('data from the bike list page', location.state.bikeData);

    useEffect(() => {
        console.log("imagessssss",location.state.bikeData.photo);
        dispatch(adminGetLocation())

        setImages1([location.state.bikeData.photo])
        setBikeName(location.state.bikeData.bikeName)
        setModel(location.state.bikeData.bikeModel)
        setEngineNumber(location.state.bikeData.engineNumber)
        setBrand(location.state.bikeData.brand)
        setFuel(location.state.bikeData.fuel)
        setDescription(location.state.bikeData.description)
        setPrice(location.state.bikeData.price)
        setColor(location.state.bikeData.color)
        setLocation(location.state.bikeData.location)
    }, [])

    const locationData = useSelector((state) => state.adminGetLocationReducer.location)
    console.log('location data', locationData);

    console.log("dsdsd",bikeModel);
    console.log('aaa',bikeName);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        console.log('data submit',data);
        const formData = new FormData()

        images.forEach((image) => {
            formData.append("images", image)
        })

        formData.append("bikeName", bikeName)
        formData.append("bikeModel", bikeModel)
        formData.append("engineNumber", engineNumber)
        formData.append("fuel", fuel)
        formData.append("imageUrl",images1)
        formData.append("brand", brand)
        formData.append("price", price)
        formData.append("color", color)
        formData.append("location", loc)
        formData.append("description", description)

        console.log('images',images);

    
        const id= location.state.bikeData._id
        adminEditBikeAPI(id,formData).then((data) => {
            console.log('edited data form the backend', data.data);
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
                    }}

                    component='form' onSubmit={handleSubmit(onSubmit)} >

                    <h3>ADD BIKE</h3>

                    {
                        sucess ? <Alert severity="success">Done Bike Added !!!</Alert> : ''
                    }


                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Bike Name"
                            autoFocus
                            defaultValue={location.state.bikeData.bikeName}
                            {...register("bikeName",
                                {
                                    required: "This is required", minLength: 3
                                })}
                            onChange={(e) => setBikeName(e.target.value)}
                            helperText={errors.bikeName && <div style={{ color: 'red' }}>Please enter the bike name</div>}

                        />


                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Bike Model"
                            defaultValue={location.state.bikeData.bikeModel}
                            {...register("bikeModel",
                                {
                                    required: "This is required", minLength: 3
                                })}
                            onChange={(e) => setModel(e.target.value)}
                            helperText={errors.bikeModel && <div style={{ color: 'red' }}>Please enter the bike model</div>}
                        />


                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Engine Number"
                            defaultValue={location.state.bikeData.engineNumber}
                            {...register("engineNumber",
                                {
                                    required: true, minLength: 3
                                })}
                            onChange={(e) => setEngineNumber(e.target.value)}
                            helperText={errors.engineNumber && <div style={{ color: 'red' }}>Please enter the engine number</div>}
                        />

                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Brand"
                            defaultValue={location.state.bikeData.brand}
                            {...register("brand",
                                {
                                    required: true, minLength: 3
                                })}
                            onChange={(e) => setBrand(e.target.value)}
                            helperText={errors.brand && <p style={{ color: 'red' }}>Please enter the brand</p>}
                        />

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Color"
                            defaultValue={location.state.bikeData.color}
                            {...register("color",
                                {
                                    required: true, minLength: 3
                                }
                            )}
                            onChange={(e) => setColor(e.target.value)}
                            helperText={errors.color && <div style={{ color: 'red' }}>Please enter the color</div>}
                        />


                        <FormControl fullWidth sx={{ marginTop: "40px", mr: 2 }} >
                            <InputLabel id="demo-simple-select-label"  >Fuel</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={fuel}
                                defaultValue={location.state.bikeData.fuel}
                                label="Fuel"
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                                {...register("fuel",
                                    {
                                        required: true, minLength: 3
                                    }
                                )}
                                onChange={(e) => setFuel(e.target.value)}
                            >

                                <MenuItem value="petrol" >Petrol</MenuItem>
                                <MenuItem value="diesel" >Diesel</MenuItem>
                                <MenuItem value="electric" >Electric</MenuItem>
                            </Select>
                            {errors.fuel && <p style={{ color: 'red' }}>Please enter the fuel type</p> ? errors.fuel && <small style={{ color: 'red' }}>Please enter the fuel type</small> : <FormHelperText></FormHelperText>}
                        </FormControl>
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            defaultValue={location.state.bikeData.price}
                            label="Price"
                            type="number"
                            {...register("price",
                                {
                                    required: true, minLength: 2, maxLength: 3
                                }
                            )}
                            onChange={(e) => setPrice(e.target.value)}
                            helperText={errors.price && <p style={{ color: 'red' }}>Please enter a price</p>}
                        />

                        <FormControl fullWidth sx={{ marginTop: "40px", mr: 2 }} >
                            <InputLabel id="demo-simple-select-label"  >Location</InputLabel>
                            {/* <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={location}
                        label="Location"
                        {...register("location",
                            {
                                required: true, minLength: 3
                            }
                        )}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                      
                        {
                            location ? location.map((x)=>{
                                return(
                                   
                                    <MenuItem key={x._id}  >{x.location}</MenuItem>
                                   
                                )
                            }) : ""
                        }
                    </Select> */}

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue={location.state.bikeData.location}
                                // value={location} // retrieve the selected value from React Hook Form
                                label="Location"
                                name='location'
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                                {...register("location", { required: true })}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                {/* <MenuItem disabled value="choose">Choose Option</MenuItem> */}
                                {locationData
                                    ? locationData.map((x) => {
                                        if (x !== location.state.bikeData.Location) {
                                            return (
                                                <MenuItem key={x._id} value={x.location}>
                                                    {/* set the value to the location */}
                                                    {x.location}
                                                </MenuItem>
                                            )
                                        }
                                    })
                                    : (
                                        <MenuItem >No locations available</MenuItem>
                                    )}
                            </Select>


                            {/* <select  name="" id="">
                    {
                        location ? location.map((m)=>{
                            return <><option value={m.location}>{m.location}</option></>
                        })  :' '
                    }
                    </select> */}

                            {errors.location && <p style={{ color: 'red' }}>Please enter the fuel type</p> ? errors.location && <small style={{ color: 'red' }}>Please enter the fuel type</small> : <FormHelperText></FormHelperText>}
                        </FormControl>

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Description"
                            defaultValue={location.state.bikeData.description}
                            multiline
                            maxRows={4}
                            {...register("description",
                                {
                                    required: true, minLength: 3
                                }
                            )}
                            onChange={(e) => setDescription(e.target.value)}
                            helperText={errors.description && <p style={{ color: 'red' }}>Please add a description</p>}
                        />
                    </div>


                    {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Box>

                        <Figure>
                            <Figure.Image
                                width={200}
                                height={150}
                                alt="171x180"
                               src={location.state.bikeData.photo[0]}
                            />
                           

                        </Figure>
                        </Box>
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            inputProps={{
                                accept: '.jpg, .jpeg, .png'
                            }}
                            helperText={errors.image1 && <p style={{ color: 'red' }}>Please choose an image</p> ? errors.image1 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}
                            {...register("image1",
                                {
                                    required: true, minLength: 1
                                }
                            )}
                            onChange={(e) => setImages([...images, e.target.files[0]])}
                        />

                        <Box>

                        <Figure>
                            <Figure.Image
                                width={150}
                                height={160}
                                alt="171x180"
                                src={location.state.bikeData.photo[1]}

                            />
                        </Figure>
                        </Box>


                        <TextField sx={{ mr: 2 }}
                            type="file"
                            inputProps={{
                                accept: '.jpg, .jpeg, .png'
                            }}
                            helperText={errors.image2 && <p style={{ color: 'red' }}>Please choose an image</p> ? errors.image2 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}
                            {...register("image2",
                                {
                                    required: true, minLength: 1
                                })}
                            onChange={(e) => setImages([...images, e.target.files[0]])}
                        />

                    </div> */}

                    <Grid container alignItems="center" justify="center" spacing={2} mt={3}>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <Avatar variant="square" sx={{ width: 300, height: 150 }}>
                                    <img src={location.state.bikeData.photo[0]} alt="" />
                                </Avatar>
                            </Box>
                            <TextField
                                type="file"
                                inputProps={{
                                    accept: ".jpg, .jpeg, .png",
                                }}
                                // helperText={
                                //     errors.image1 && (
                                //         <p style={{ color: "red" }}>Please choose an image</p>
                                //     )
                                //         ? errors.image1 && (
                                //             <p style={{ color: "red" }}>Please choose an image</p>
                                //         )
                                //         : "Please select the image"
                                // }
                                // {...register("image1", {
                                //     required: true,
                                //     minLength: 1,
                                // })}
                                name='image1'
                                onChange={(e) => setImages([...images, e.target.files[0]])}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <Avatar variant="square" sx={{ width: 300, height: 150 }}>
                                    <img src={location.state.bikeData.photo[1]} alt="" />
                                </Avatar>
                            </Box>
                            <TextField
                                type="file"
                                inputProps={{
                                    accept: ".jpg, .jpeg, .png",
                                }}
                                // helperText={
                                //     errors.image2 && (
                                //         <p style={{ color: "red" }}>Please choose an image</p>
                                //     )
                                //         ? errors.image2 && (
                                //             <p style={{ color: "red" }}>Please choose an image</p>
                                //         )
                                //         : "Please select the image"
                                // }
                                // {...register("image2", {
                                //     required: true,
                                //     minLength: 1,
                                // })}
                                name='image2'
                                onChange={(e) => setImages([...images, e.target.files[0]])}
                            />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="center" spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <Avatar variant="square" sx={{ width: 300, height: 150 }}>
                                    <img src={location.state.bikeData.photo[2]} alt="" />
                                </Avatar>
                            </Box>
                            <TextField
                                type="file"
                                inputProps={{
                                    accept: ".jpg, .jpeg, .png",
                                }}
                                // helperText={
                                //     errors.image3 && (
                                //         <p style={{ color: "red" }}>Please choose an image</p>
                                //     )
                                //         ? errors.image3 && (
                                //             <p style={{ color: "red" }}>Please choose an image</p>
                                //         )
                                //         : "Please select the image"
                                // }
                                // {...register("image3", {
                                //     required: true,
                                //     minLength: 1,
                                // })}
                                name='image3'
                                onChange={(e) => setImages([...images, e.target.files[0]])}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <Avatar variant="square" sx={{ width: 300, height: 150 }}>
                                    <img src={location.state.bikeData.photo[3]} alt="" />
                                </Avatar>
                            </Box>
                            <TextField
                                type="file"
                                inputProps={{
                                    accept: ".jpg, .jpeg, .png",
                                }}
                                // helperText={
                                //     errors.image4 && (
                                //         <p style={{ color: "red" }}>Please choose an image</p>
                                //     )
                                //         ? errors.image4 && (
                                //             <p style={{ color: "red" }}>Please choose an image</p>
                                //         )
                                //         : "Please select the image"
                                // }
                                // {...register("image4", {
                                //     required: true,
                                //     minLength: 1,
                                // })}
                                name='image4'
                                onChange={(e) => setImages([...images, e.target.files[0]])}
                            />
                        </Grid>
                    </Grid>

                    {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Box>

                            <Figure>
                                <Figure.Image
                                    width={150}
                                    height={160}
                                    alt="171x180"
                                    src={location.state.bikeData.photo[2]}

                                />

                            </Figure>
                        </Box>
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            inputProps={{
                                accept: '.jpg, .jpeg, .png'
                            }}
                            helperText={errors.image3 && <p style={{ color: 'red' }}>Please choose an image</p> ? errors.image3 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}
                            {...register("image3",
                                {
                                    required: true, minLength: 1
                                })}
                            onChange={(e) => setImages([...images, e.target.files[0]])}
                        />


                        <Figure>
                            <Figure.Image
                                width={150}
                                height={160}
                                alt="171x180"
                                src={location.state.bikeData.photo[3]}

                            />

                        </Figure>


                        <TextField sx={{ mr: 2 }}
                            type="file"
                            inputProps={{
                                accept: '.jpg, .jpeg, .png'
                            }}
                            helperText={errors.image4 && <p style={{ color: 'red' }}>Please choose an image</p> ? errors.image4 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}
                            {...register("image4",
                                {
                                    required: true, minLength: 1
                                })}
                            onChange={(e) => setImages([...images, e.target.files[0]])}
                        />

                    </div> */}

                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px' }}>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#6366f1' }}
                            sx={{
                                mr: 2, mt: 5, width: '100%'
                            }}
                            type='submit'

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

export default EditBike
