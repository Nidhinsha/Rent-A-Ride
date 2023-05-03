import React from 'react';
import { Grid, TextField, Box, Typography, InputAdornment, Button } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { googleSignupAction, userLoginAction } from '../../../Redux/Actions/userActions'
import Loading from '../../../components/Loading/Loading'
import './Login.css'



import { auth, provider } from '../../../firebase/config';
import { signInWithPopup } from 'firebase/auth'
import { googleSignupAPI } from '../../../Api/User/ApiCalls';
import { userActionType } from '../../../Redux/Constants/userConstants';

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

function Login() {

  const userLoginData = useSelector(state => state.userLoginReducer)
  const { userLoginError, loading, userLoginDetails } = userLoginData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, handleSubmit,
    formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    })

  const submitHandler = async (data) => {

    const email = data.email
    const password = data.password

    try {
      dispatch(userLoginAction(email, password))

    } catch (error) {

    }
  }

  // google

  const googleLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      const fullName = data.user.displayName
      const [firstName, lastName] = fullName.split(' ')

      googleSignupAPI(firstName, lastName, data.user.email, data.user.phoneNumber, data.user.photoURL).then((data)=>{

        dispatch(googleSignupAction(data.data))
        localStorage.setItem("userInfo", JSON.stringify(data.data));
        // navigate("/")
        window.location.href='/'
      })
      .catch((error)=>{
        dispatch({
          type: userActionType.GOOGLE_SIGNUP_FAIL,
          payload: error.response.data.message
        })
      })

    })
  }





  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box boxShadow={3} borderRadius={4} p={2} m={4} sx={{ maxWidth: "800px" }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6} sx={{mt:5}}>
            <img src={require("../../../assests/images/loginImage.png")}
              className="img-fluid " alt="Phone"
             
               />
          </Grid>
          <Grid item xs={12} md={6} direction="column" alignItems="flex-end">
            <Box mb={15}>
              <Typography variant="h5" align="left" sx={{ mt: 7 }}>
                Login to Rent&Ride
              </Typography>
            </Box>



            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
              component="form" onSubmit={handleSubmit(submitHandler)}>
              {
                userLoginError ? <p className='p-error' style={{ color: 'red' }}>{userLoginError}</p> : ""
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
                Login
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{ mb: 2 }}
                component={Link} // make the button act as a link
                to="/signup" // specify the link destination
              >
                New Member ? Create
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{ mb: 2 }}
                component={Link} // make the button act as a link
                to="/otp-login" // specify the link destination
              >
                login with otp
              </Button>
              <Button
                variant="text"
                fullWidth
                sx={{ mb: 2 }}
                onClick={googleLogin}
              >
                login with Google
              </Button>

            </Box>

          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Login;