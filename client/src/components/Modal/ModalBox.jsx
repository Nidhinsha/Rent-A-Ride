// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { Grid, TextField, InputAdornment } from '@mui/material';
// import { AccountCircle, Email, Lock, GoogleIcon, } from '@mui/icons-material';
// import PhoneIcon from '@mui/icons-material/Phone';

// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// // import { userSignup } from '../../../Redux/Actions/userActions';
// import { updateUserProfileAction } from '../../Redux/Actions/userActions'
// import { userEditProfileAPI } from '../../Api/User/ApiCalls';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 20,
//   p: 4,
// };


// const schema = yup.object().shape({
//   firstName: yup
//     .string("first name should be string")
//     .min(3, "first name should have a min length of 3 letters")
//     .required("firstName is required"),
//   lastName: yup
//     .string("last name should be string")
//     .min(3, "last name should have a min length of 3 letters")
//     .required("lastName is required"),
//   email: yup
//     .string("email should be string")
//     .email("please provide a valid email")
//     .required("email address is required"),
//   phone: yup
//     .string(" number should be string")
//     .min(10, "number should have a min length of 10")
//     .max(10, "number should have a max length of 10")
//     .required("number is required"),

// })
// const ModalBox = ({ closeModal, details }) => {

//   // const [open, setOpen] = React.useState(false);
//   // const handleOpen = () => setOpen(true);
//   // const handleClose = () => setOpen(false);
//   console.log("DETILAS",details);
//   const [basicModal, setBasicModal] = React.useState(true)
//   const [loading, setLoading] = React.useState(true)
//   const dispatch = useDispatch()
//   // const navigate = useNavigate()

//   const toggleShow = () => setBasicModal(!basicModal)

//   const { register, handleSubmit,
//     formState: { errors } } = useForm({
//       resolver: yupResolver(schema)
//     })

//   const submitHandler = async (data) => {
//     setLoading(true)
//     const firstName = data.firstName
//     const lastName = data.lastName
//     const email = data.email
//     const phone = data.phone


//     userEditProfileAPI(firstName, lastName, email, phone, details.id).then((data) => {
//       console.log('edited', data.data);

//       localStorage.setItem("userInfo", JSON.stringify(data.data))
//       dispatch(updateUserProfileAction(data.data))
//       setLoading(false)
//       closeModal(false)
//     })
//   }

//   return (



//     <div>
//       <Button >Open modal</Button>
//       <Modal
//         // open={open}
//         // onClose={handleClose}

//         show={basicModal} setShow={setBasicModal}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style} component="form" onSubmit={handleSubmit(submitHandler)}>
//           <Box>
//             <Typography component="h1" variant="h5">
//               Edit Details
//             </Typography>

//             <Button className='btn-close' color='none' onClick={(e) => closeModal(false)}></Button>
//           </Box>
//           <TextField
//             autoFocus
//             label="First Name"
//             name='firstName'
//             id='firstName'
//             defaultValue={details.firstName}
//             fullWidth

//             error={!!errors.firstName}
//             helperText={errors.firstName ? errors.firstName.message : ""}
//             {...register("firstName")}

//             sx={{ mb: 2 }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="start">
//                   <AccountCircle />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField

//             label="Last Name"
//             name='lastName'
//             id='lastName'
//             defaultValue={details.lastName}
//             fullWidth

//             error={!!errors.lastName}
//             helperText={errors.lastName ? errors.lastName.message : ""}
//             {...register("lastName")}

//             sx={{ mb: 2 }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="start">
//                   <AccountCircle />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             label="Email"
//             name='email'
//             defaultValue={details.email}
//             fullWidth

//             error={!!errors.email}
//             helperText={errors.email ? errors.email.message : ""}
//             {...register("email")}


//             sx={{ mb: 2 }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="start">
//                   <Email />
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <TextField
//             label="Phone Number"
//             name='phone'
//             type="phone"
//             defaultValue={details.phone}
//             fullWidth

//             error={!!errors.phone}
//             helperText={errors.phone ? errors.phone.message : ""}
//             {...register("phone")}


//             sx={{ mb: 2 }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="start">
//                   <PhoneIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />


//           <Button type='submit' variant="contained" fullWidth sx={{
//             mb: 2, backgroundColor: "#6366F1", "&.MuiButtonBase-root:hover": {
//               bgcolor: "#6366F1"
//             }
//           }}
//             onClick={(e) => closeModal(false)} >
//             close
//           </Button>
//           {
//             loading ?

//               <Button type='submit' variant="contained" fullWidth sx={{
//                 mb: 2, backgroundColor: "#6366F1", "&.MuiButtonBase-root:hover": {
//                   bgcolor: "#6366F1"
//                 }
//               }}
//                 disabled
//               >
//                 edit
//               </Button> :
//               <Button type='submit' variant="contained" fullWidth sx={{
//                 mb: 2, backgroundColor: "#6366F1", "&.MuiButtonBase-root:hover": {
//                   bgcolor: "#6366F1"
//                 }
//               }}
//               >
//                 edit
//               </Button>
// }
//         </Box>
//       </Modal>
//     </div>

//   )
// }

// export default ModalBox


import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { Box, Button } from '@mantine/core';
import { CircularProgress, TextField, Typography } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { userEditProfileAPI } from '../../Api/User/ApiCalls';

import { useDispatch } from 'react-redux';
// import { updateProfile } from '../../REDUX/Actions/USER_ACTIONS/userProfileAction';
import { updateUserProfileAction } from '../../Redux/Actions/userActions';



const schema = yup.object().shape({
  phone: yup
    .string("email should be a string")
    .min(10, "Mobile No should have a minimum length of 10")
    .max(10, "Mobile No  should have a maximum length of 10")
    .required('Mobile No  is required'),
  email: yup
    .string('email should be a string')
    .email('please provide a valid email')
    .required('email address is required'),
    firstName: yup
    .string("first name should be string")
    .min(3, "first name should have a min length of 3 letters")
    .required("firstName is required"),
  lastName: yup
    .string("last name should be string")
    .min(3, "last name should have a min length of 3 letters")
    .required("lastName is required"),
})

export default function ModalBox({ closeModal, details }) {
  console.log("DETILAS", details);
  const [basicModal, setBasicModal] = useState(true);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const toggleShow = () => setBasicModal(!basicModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = (data) => {
    setLoading(true)
    console.log("MODAL DATA", data);
    let firstName = data.firstName
    let lastName = data.lastName
    let email = data.email
    let phone = data.phone

    userEditProfileAPI(firstName, lastName, email, phone, details.id).then((data) => {
      console.log('Edited', data.data);
      localStorage.setItem("userInfo", JSON.stringify(data.data))
      dispatch(updateUserProfileAction(data.data))
      setLoading(false)
      closeModal(false)
    })
  }

  return (
    <>
      {/* <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn> */}
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <Typography component="h1" variant="h5">
                Edit Details
              </Typography>

              <MDBBtn className='btn-close' color='none' onClick={(e) => closeModal(false)}></MDBBtn>
            </MDBModalHeader>

            <Box
              component="form"
              onSubmit={handleSubmit(submitHandler)}
              sx={{ mt: 1 }}
            >
              <MDBModalBody>
                <TextField
                  margin="normal"
                  fullWidth
                  name='firstName'
                  id="firstName"
                  label="firstName"
                  defaultValue={details.firstName}
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ""}
                  {...register("firstName")}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name='lastName'
                  id="lastName"
                  label="lastName"
                  defaultValue={details.lastName}
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ""}
                  {...register("lastName")}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name='email'
                  id="email"
                  label="Email"
                  defaultValue={details.email}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  {...register("email")}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name='phone'
                  id="phone"
                  label="phone"
                  defaultValue={details.phone}
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : ""}
                  {...register("phone")}
                />
                <p >{details.id}</p>
              </MDBModalBody>

              <MDBModalFooter>
                {/* <MDBBtn color='secondary' onClick={(e) => closeModal(false)}>
                Close
              </MDBBtn> */}
                <Button variant="soft" onClick={(e) => closeModal(false)}>Close</Button>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {
                    loading ? <Button className='mb-4 container col-md-4 sm-3' style={{ backgroundColor: 'black' }} disabled ><CircularProgress /></Button> :
                      <Button type='submit' style={{ backgroundColor: '#ffc720', color: 'black' }}
                      >Save Changes</Button>
                  }

                </Box>
              </MDBModalFooter>
            </Box>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}