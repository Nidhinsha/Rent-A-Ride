
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
    const firstName = data.firstName
    const lastName = data.lastName
    const email = data.email
    const phone = data.phone

    userEditProfileAPI(firstName, lastName, email, phone, details.id).then((data) => {
      localStorage.setItem("userInfo", JSON.stringify(data.data))
      dispatch(updateUserProfileAction(data.data))
      setLoading(false)
      closeModal(false)
    })
  }

  return (
    <>
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
              </MDBModalBody>

              <MDBModalFooter>
                <Button variant="soft" onClick={(e) => closeModal(false)}>Close</Button>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {
                    loading ? <Button className='mb-4 container col-md-4 sm-3' style={{ backgroundColor: 'black' }} disabled ><CircularProgress /></Button> :
                      <Button type='submit' style={{ backgroundColor: '#6366F1', color: 'white' }}
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