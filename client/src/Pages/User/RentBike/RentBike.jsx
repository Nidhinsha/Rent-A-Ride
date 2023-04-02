import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { userAddBikeAPI } from '../../../Api/User/ApiCalls';
import NavBar from '../../../components/NavBar/NavBar';
import { FormHelperText } from '@mui/material'
import { useForm } from "react-hook-form"
import { userGetLocation } from '../../../Redux/Actions/userActions';

function RentBike() {

    const [ownerName, setOwnerName] = useState('')
    const [bikeName, setBikeName] = useState('')
    const [bikeModel, setModel] = useState('')
    const [engineNumber, setEngineNumber] = useState('')
    const [brand, setBrand] = useState('')
    const [fuel, setFuel] = useState('')
    const [loc, setLocation] = useState([])
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [color, setColor] = useState('')
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [sucess, setSuccess] = useState(false);



    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(userGetLocation())
    }, [])

    const location = useSelector((state) => state.userLocationReducer.locationData)
    console.log(location, 'location in user rent page')




    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async () => {
        console.log(bikeName, bikeModel, engineNumber, brand, fuel, location, description, price, color, images, 'form data for add bike the ');
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
        formdata.append("location", loc)
        formdata.append("description", description)

        userAddBikeAPI(formdata).then((data) => {
            console.log(data.data, 'form data response');

            // dispatch(adminAddBikeAction(data.data))
            setLoading(false)

            setSuccess(true)

            setTimeout(() => {
                navigate("/profile", { state: { bikeAdded: true } })
                setSuccess(false)
            }, 3000)
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


            <Box sx={{ display: 'flex', justifyContent: 'center', width: "100%" }} >

                <Box
                    sx={{
                        '& .MuiTextField-root': { mt: 5, width: '100%' },
                    }}
                    component="form" onSubmit={handleSubmit(onSubmit)}
                >

                    <h3>ADD BIKE</h3>

                    {sucess ? <Alert severity="success">Done Bike Added !!!</Alert> : ''}

                    <div style={{ display: 'flex', flexDirection: 'row' }} >
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Owner Name"
                            {...register("ownerName",
                                {
                                    required: "This is required", minLength: 3
                                })}
                            onChange={(e) => setOwnerName(e.target.value)}
                            helperText={errors.ownerName && <div style={{ color: 'red' }}>Please enter the owner name</div>}
                        />
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Bike Name"
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
                            {...register("engineNumber",
                                {
                                    required: true, minLength: 3
                                })}

                            onChange={(e) => setEngineNumber(e.target.value)}
                            helperText={errors.engineNumber && <div style={{ color: 'red' }}>Please enter the engine number</div>} />

                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Brand"
                            {...register("brand",
                                {
                                    required: true, minLength: 3
                                })}
                            onChange={(e) => setBrand(e.target.value)}
                            helperText={errors.engineNumber && <p style={{ color: 'red' }}>Please enter the brand</p>}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            required
                            id="outlined-required"
                            label="Color"
                            {...register("color",
                                {
                                    required: true, minLength: 3
                                }
                            )}
                            onChange={(e) => setColor(e.target.value)}
                            helperText={errors.color && <div style={{ color: 'red' }}>Please enter the color</div>}
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
                            {errors.fuel && <p style={{ color: 'red' }}>Please enter the fuel type</p> ? errors.fuel && <small style={{ color: 'red' }}>Please enter the fuel type</small> : <FormHelperText></FormHelperText>}
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
                            helperText={errors.price && <p style={{ color: 'red' }}>Please enter a price</p>}
                        />

                        <FormControl fullWidth sx={{ marginTop: "40px", mr: 2 }}>
                            <InputLabel id="demo-simple-select-label">Location</InputLabel>
                            {/* <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={location}
                                label="Location"
                                {...register("location",
                                    {
                                        required: true, minLength: 3
                                    }
                                )}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                  {
                                    locationData ? locationData.map((value)=>{
                                        return(
                                            <MenuItem key={value._id} value={value.location} >{value.location}</MenuItem>
                                        )
                                    }) : ""
                                }
                               
                            </Select> */}

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={location} // retrieve the selected value from React Hook Form
                                label="Location"
                                name='location'
                                {...register("location", { required: true })}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                {/* <MenuItem disabled value="choose">Choose Option</MenuItem> */}
                                {location
                                    ? location.map((x) => (
                                        <MenuItem key={x._id} value={x.location}>
                                            {/* set the value to the location */}
                                            {x.location}
                                        </MenuItem>
                                    ))
                                    : (
                                        <MenuItem >No locations available</MenuItem>
                                    )}
                            </Select>
                            {errors.location && <p style={{ color: 'red' }}>Please enter the fuel type</p> ? errors.location && <small style={{ color: 'red' }}>Please enter the fuel type</small> : <FormHelperText></FormHelperText>}
                        </FormControl>


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
                                    required: true, minLength: 3
                                }
                            )}

                            onChange={(e) => setDescription(e.target.value)}
                            helperText={errors.description && <p style={{ color: 'red' }}>Please add a description</p>}
                        />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            helperText={errors.image1 && <p style={{ color: 'red' }}>Please choose an image</p> ? errors.image1 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}

                            onChange={(e) => setImages([...images, e.target.files[0]])} />
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            helperText={errors.image2 && <p style={{ color: 'red' }}>Please choose an image</p> ? errors.image2 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}
                            {...register("image2",
                                {
                                    required: true, minLength: 1
                                })}
                            onChange={(e) => setImages([...images, e.target.files[0]])} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            helperText={errors.image3 && <p style={{ color: 'red' }}>Please choose an image</p> ? errors.image3 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}
                            {...register("image3",
                                {
                                    required: true, minLength: 1
                                })}
                            onChange={(e) => setImages([...images, e.target.files[0]])} />
                        <TextField sx={{ mr: 2 }}
                            type="file"
                            helperText={errors.image4 && <p style={{ color: 'red' }}>Please choose an image</p> ? errors.image4 && <p style={{ color: 'red' }}>Please choose an image</p> : "Please select the image"}
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
                                        mr: 2, mt: 5, width: '100%'
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

            {/* </div> */}
        </>

    )
}

export default RentBike
