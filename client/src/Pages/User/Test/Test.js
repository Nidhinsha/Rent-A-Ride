import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, InputAdornment } from '@mui/material';
import { AccountCircle, Email, Lock, GoogleIcon, } from '@mui/icons-material';
import PhoneIcon from '@mui/icons-material/Phone';

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { userSignup } from '../../../Redux/Actions/userActions';
import { updateUserProfileAction } from '../../../Redux/Actions/userActions'
import { userEditProfileAPI } from '../../../Api/User/ApiCalls';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 20,
  p: 4,
};


const schema = yup.object().shape({
  firstName: yup
    .string("first name should be string")
    .min(3, "first name should have a min length of 3 letters")
    .required("firstName is required"),
  lastName: yup
    .string("last name should be string")
    .min(3, "last name should have a min length of 3 letters")
    .required("lastName is required"),
  email: yup
    .string("email should be string")
    .email("please provide a valid email")
    .required("email address is required"),
  phone: yup
    .string(" number should be string")
    .min(10, "number should have a min length of 10")
    .max(10, "number should have a max length of 10")
    .required("number is required"),

})
const Test = ({ closeModal, details }) => {

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [basicModal, setBasicModal] = React.useState(true)
  const [loading, setLoading] = React.useState(true)
  const dispatch = useDispatch()
  // const navigate = useNavigate()

  const toggleShow = () => setBasicModal(!basicModal)

  const { register, handleSubmit,
    formState: { errors } } = useForm({
      resolver: yupResolver(schema)
    })

  const submitHandler = async (data) => {
    setLoading(true)
    const firstName = data.firstName
    const lastName = data.lastName
    const email = data.email
    const phone = data.phone


    userEditProfileAPI(firstName, lastName, email, phone, details.id).then((data) => {
      console.log('edited', data.data);

      localStorage.setItem("userInfo", JSON.stringify(data.data))
      dispatch(updateUserProfileAction(data.data))
      setLoading(false)
      closeModal(false)
    })
  }

  return (



    <div>
      <Button >Open modal</Button>
      <Modal
        // open={open}
        // onClose={handleClose}

        show={basicModal} setShow={setBasicModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit(submitHandler)}>
          <Box>
            <Typography component="h1" variant="h5">
              Edit Details
            </Typography>

            <Button className='btn-close' color='none' onClick={(e) => closeModal(false)}></Button>
          </Box>
          <TextField
            autoFocus
            label="First Name"
            name='firstName'
            id='firstName'
            defaultValue={details.firstName}
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
            defaultValue={details.lastName}
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
            defaultValue={details.email}
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
            defaultValue={details.phone}
            fullWidth

            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
            {...register("phone")}


            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />


          <Button type='submit' variant="contained" fullWidth sx={{
            mb: 2, backgroundColor: "#6366F1", "&.MuiButtonBase-root:hover": {
              bgcolor: "#6366F1"
            }
          }}
            onClick={(e) => closeModal(false)} >
            close
          </Button>
          {
            loading ?

              <Button type='submit' variant="contained" fullWidth sx={{
                mb: 2, backgroundColor: "#6366F1", "&.MuiButtonBase-root:hover": {
                  bgcolor: "#6366F1"
                }
              }}
                disabled
              >
                edit
              </Button> :
              <Button type='submit' variant="contained" fullWidth sx={{
                mb: 2, backgroundColor: "#6366F1", "&.MuiButtonBase-root:hover": {
                  bgcolor: "#6366F1"
                }
              }}
              >
                edit
              </Button>
}
        </Box>
      </Modal>
    </div>

  )
}

export default Test
