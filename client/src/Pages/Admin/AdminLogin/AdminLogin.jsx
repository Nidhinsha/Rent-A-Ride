import React from 'react';
import { Grid, TextField, Box, Typography, InputAdornment, Button } from '@mui/material';
import { AccountCircle, Email, Lock, GoogleIcon } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { adminLogin } from '../../../Redux/Actions/adminActions'
import ErrorMessage from '../../../components/Alert/Error'
import Loading from '../../../components/Loading/Loading'
import './AdminLogin.css'


const schema = yup.object().shape({

  email: yup
    .string("email should be string")
    .email("please provide a valid email")
    .required("email address is required"),

  password: yup
    .string("pasword should be string")
    .min(5, "password should have a min length of 5")
    .max(12, "password should have a max length of 12")
    .required("password is required"),
})


function AdminLogin() {



  const dispatch = useDispatch()
  const navigate = useNavigate()

  const admin = useSelector((state) => state.adminLoginReducer)
  const { loading, adminLoginError, adminLoginData } = admin

  const { register, handleSubmit,
    formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    })

  const submitHandler = async (data) => {

    const email = data.email

    const password = data.password

    try {
      console.log("form", data);
      dispatch(adminLogin(email, password))
      // navigate('/')

    } catch (error) {

    }
  }






  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box boxShadow={3} borderRadius={4} p={2} m={4}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <img src="https://cdn.discordapp.com/attachments/1008571132938555432/1089765405301669919/pekka_a_person_sitting_on_a_scooter_with_color_light_blue_and_b_555f7a57-94cd-4851-95a9-8dbbe7933355.png"
              className="img-fluid" alt="Phone" />
          </Grid>
          <Grid item xs={12} md={6} direction="column" alignItems="flex-end">
            <Box mb={20}>
              <Typography variant="h5" align="left" sx={{ mt: 7 }}>
                Login to Rent&Ride Admin Panel
              </Typography>
            </Box>



            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
              component="form" onSubmit={handleSubmit(submitHandler)}>
              {
                adminLoginError ? <p className='p-error' style={{ color: 'red' }}>{adminLoginError}</p> : ""
              }
              {
                loading ? <Loading /> : ""
              }
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

              <Button type='submit' variant="contained" fullWidth sx={{
                mb: 2, backgroundColor: "#6366F1", "&.MuiButtonBase-root:hover": {
                  bgcolor: "#6366F1"
                }
              }} >
                login
              </Button>
            </Box>

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AdminLogin;