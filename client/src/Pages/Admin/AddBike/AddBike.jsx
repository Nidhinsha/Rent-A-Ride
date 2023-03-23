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
import { adminAddBikeAction } from '../../../Redux/Actions/adminActions';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
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
    const [sucess,setSuccess]=useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit =async()=>{
        console.log(bikeName,bikeModel,engineNumber,brand,fuel,description,price,color,images,'form data for add bike the ');
        setLoading(true)

        // for using the form data
         
        const formdata = new FormData()

        // for image
        console.log(images,';;;;');
        images.forEach((value)=>{
            console.log(value)
            formdata.append("images",value)
        })


        console.log(formdata.get("images"));

        // the form data 
        formdata.append("bikeName",bikeName)
        formdata.append("bikeModel",bikeModel)
        formdata.append("engineNumber",engineNumber)
        formdata.append("fuel",fuel)
        formdata.append("brand",brand)
        formdata.append("price",price)
        formdata.append("color",color)
        formdata.append("description",description)

        adminAddBikeAPI(formdata).then((data)=>{
            console.log(data.data,'form data response');

            dispatch(adminAddBikeAction(data.data))
            setLoading(false)

            setSuccess(true)

            // setTimeout(()=>{
            //     Navigate("/admin/bikes",{state:{bikeAdded:true}})
            //     setSuccess(false)
            // },3000)
        })
        .catch((error)=>{
            console.log("some error",error);
            setLoading(false)
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
            {
      sucess?   <Alert severity="success">This is a success alert — check it out!</Alert>:''
     }
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


                    {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                    </div> */}
                    <input type='file'  onChange={(e) => setImages([...images, e.target.files[0]])} />
                    <input type='file'  onChange={(e) => setImages([...images, e.target.files[0]])} />
                    <input type='file'  onChange={(e) => setImages([...images, e.target.files[0]])} />
                    <input type='file'  onChange={(e) => setImages([...images, e.target.files[0]])} />
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
