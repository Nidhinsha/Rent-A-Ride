import React from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
}
  from 'mdb-react-ui-kit';

import { InputText } from "primereact/inputtext";
// import { IconName } from "react-icons/bs";

import { Button } from 'primereact/button';


import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userSignup } from '../../../Redux/Actions/userActions';
import {  Link, useNavigate } from 'react-router-dom'
import Loading from '../../../components/Loading/Loading';
import ErrorMessage from '../../../components/Alert/Error';
import { useForm } from "react-hook-form";
import './Signup.css'


function Signup() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')


  const navigate = useNavigate()
  const dispatch = useDispatch()

  // not finished
  const haveAccount = () => {
    navigate('/user-login')
  }
  const { register, handleSubmit, formState: { errors } } = useForm();

  const Signup = useSelector(state => state.userSignup)

  const { loading, error, userInfo } = Signup

  const onSubmit = (data) => {
    console.log(data, 'vbvbvb');

    dispatch(userSignup(firstName, lastName, email, phone, password))

  }
  // this one redirect the user into login page
  useEffect(() => {
    if (userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

 

  return (
    <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://cdn.discordapp.com/attachments/1008571132938555432/1086965739522637884/pekka_a_person_sitting_on_a_scooter_blue_illustration__white_ba_630badc6-1414-41e6-b2ec-03f2425615b8.png"
            className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>
          {error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : " "}
          {loading ? <Loading /> : ""}

          <h3 style={{ marginBottom: "2rem" }}>Create Account</h3>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="p-input-icon-left p-float-label" style={{ marginBottom: "2rem" }}>
              {error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : " "}
              <i className="pi pi-user " />
              <InputText id="firstName" className='p-inputtext-lg' style={{ width: '46rem', height: '3rem' }}
                {...register("firstName", { required: true, maxLength: 10 })}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
              <label htmlFor="">FirstName</label>
            {errors.firstName && <p style={{color : 'red'}}>Please check the First Name</p>}
            </div>

            <div className="p-input-icon-left p-float-label" style={{ marginBottom: "2rem" }}>
              <i className="pi pi-user " />
              <InputText id="lastName" className='p-inputtext-lg' style={{ width: '46rem', height: '3rem' }}
                {...register("lastName", { required: true, maxLength: 10 })}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
              <label htmlFor="">LastName</label>
            {errors.lastName && <p style={{color : 'red'}}>Please check the Last Name</p>}
            </div>


            <div className="p-input-icon-left p-float-label" style={{ marginBottom: "2rem" }}>
              <i className="pi pi-envelope " />
              <InputText id="email" className='p-inputtext-lg' style={{ width: '46rem', height: '3rem' }}
                {...register("email",
                  {
                    required: true,
                    maxLength: 15,

                    // pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  })}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <label htmlFor="">Email</label>
            {errors.email && <p style={{color : 'red'}}>Please check the Email</p>}
            </div>



            <div className="p-input-icon-left p-float-label" style={{ marginBottom: "2rem" }}>
              <i className="pi pi-phone " />
              <InputText id="phone" className='p-inputtext-lg' style={{ width: '46rem', height: '3rem' }}
                {...register('phone', {
                  required: true,
                  maxLength: 10,
                  minLength: 10,
                  // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                })}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label htmlFor="username">Phone</label>
            {errors.phone && <p style={{color : 'red'}}>Please check the phone</p>}
            </div>


            <div className="p-input-icon-left p-float-label" style={{ marginBottom: "2rem" }}>
            {/* <i className="pi pi-lock " /> */}
              <MDBInput wrapperClass='mb-6' label='Password' id='form1' type='password'   style={{ width: '46rem', height: '3rem' }}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 16,
                  // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                })}

                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
               {errors.password && <p style={{color : 'red'}}>Please check the Password</p>}
            </div>


           


            <Button type='submit' label="SignUp" severity="primary" raised style={{ width: '100%' }} />


            <div className="divider d-flex align-items-center justify-content-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>



            <i class="bi bi-google"></i>
            {/* <div className="card flex flex-wrap justify-content-center gap-3">



              <Button icon="pi pi-fw pi-google" className="p-button-text-icon-left" outlined
                label={<span>Sign in with <span style={{ color: '#34A853' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#EA4335' }}>l</span><span style={{ color: '#34A853' }}>e</span></span>}
                onClick={handleGoogle}
              />
            </div> */}  
          </form>
            
          <Link to={'/login'}>

          <div className="card flex flex-wrap justify-content-center gap-3" style={{ marginBottom: "2rem" }}>

          <Button className="p-button-text-icon-left" outlined
                label='Already Have an accout ? Login'
              />

          </div>
          </Link>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;