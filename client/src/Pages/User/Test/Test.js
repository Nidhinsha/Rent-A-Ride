import React from 'react'
import { Grid, TextField, Box, Typography, InputAdornment, Button } from '@mui/material';
import { AccountCircle, Email, Lock, GoogleIcon } from '@mui/icons-material';
// import Image from '../path/to/image.jpg';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// yup


const schema = yup.object().shape({
  firstName : yup
                .string("first name should be string")
                .min(3,"first name should have a min length of 3 letters")
                .required("firstName is required"),
  lastName : yup
                .string("last name should be string")
                .min(3,"last name should have a min length of 3 letters")
                .required("lastName is required"),
  email : yup
                .string("email should be string")
                .email("please provide a valid email")
                .required("email address is required"),
  phone : yup
                .string(" number should be string")
                .min(10,"number should have a min length of 10")
                .max(10,"number should have a max length of 10")
                .required("number is required"),
  password : yup
                .string("pasword should be string")
                .min(5,"password should have a min length of 5")
                .max(12,"password should have a max length of 12")
                .required("password is required"),
})
  

const Test = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register,handleSubmit,
    formState : {errors} }= useForm({
      resolver:yupResolver(schema)
    })

  const submitHandler = async(data)=>{
    const firstName = data.firstName
    const lastName = data.lastName
    const email = data.email
    const phone = data.phone

    try {
      console.log("form",data);


    } catch (error) {
      
    }
  }


return (



    <Box display="flex" justifyContent="center" alignItems="center">
      <Box boxShadow={3} borderRadius={4} p={2} m={4}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <img src="https://cdn.discordapp.com/attachments/1008571132938555432/1086965739522637884/pekka_a_person_sitting_on_a_scooter_blue_illustration__white_ba_630badc6-1414-41e6-b2ec-03f2425615b8.png"
              className="img-fluid" alt="Phone" />
          </Grid>
          <Grid item xs={12} md={6} direction="column" alignItems="flex-end">
            <Box mb={10}>
              <Typography variant="h5" align="left" sx={{ mt: 7 }}>
                Admin Login
              </Typography>
            </Box>
           


              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
                    component="form" onSubmit={handleSubmit(submitHandler)}>
                <TextField
                  autoFocus
                  label="First Name"
                  name='firstName'
                  id='firstName'
                  fullWidth
                  
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ""}
                  {...register("firstName")}

                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  
                  label="Last Name"
                  name='lastName'
                  id='lastName'
                  fullWidth

                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ""}
                  {...register("lastName")}

                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Email"
                  name='email'
                  fullWidth

                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  {...register("email")}


                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Phone Number"
                  name='phone'
                  type="phone"
                  fullWidth

                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : ""}
                  {...register("phone")}


                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  label="Password"
                  name='password'
                  type="password"
                  fullWidth

                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  {...register("password")}

                  sx={{ mb: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                />

                <Button type='submit' variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
                  Login
                </Button>
                {/* <Button variant="contained" color="primary" fullWidth startIcon={<Email />}>
                Sign up with Google
              </Button> */}
              </Box>
          
          </Grid>
        </Grid>
      </Box>
    </Box>

  )
}

export default Test
