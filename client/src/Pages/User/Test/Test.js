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
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../../../Redux/Actions/userActions'
import ErrorMessage from '../../../components/Alert/Error'
import Loading from '../../../components/Loading/Loading'
import { useForm } from "react-hook-form";
import './Test.css'


function Test() {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const userLoginData = useSelector(state => state.userLogin)
  const {error,loading,userLoginDetails } = userLoginData

  // const {register,handleSubmit}

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
      dispatch(userLogin(email,password))
    }

  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // workign not the right way 
  useEffect(() => {
      let interval;
      
      // check for userInfo every second until it is available
      interval = setInterval(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
        if (userInfo) {
          navigate('/');
          clearInterval(interval); // clear the interval once userInfo is available
        }
      }, 1000)
    
      return () => clearInterval(interval); // clear the interval on unmount
    }, [navigate,userLoginDetails]);
 



  return (
    <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://cdn.discordapp.com/attachments/1008571146465193994/1086209035457548368/Nidhinsha_single_scooter_illustration__a_person_sitting_on_it___8b629dc8-4b17-4faa-a457-20076e193e40.png"
            className="img-fluid" alt="Phone image" />
        </MDBCol>
       
        <MDBCol col='4' md='6' style={{ marginBottom: "4rem" }}>
        
         

          
          <form onSubmit={handleSubmit(onSubmit)}>
          <h3 style={{ marginBottom: "4rem" }} >Login </h3>
              {error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : " "}
              {loading ? <Loading /> : ""}

            <div className="p-input-icon-left p-float-label" style={{ marginBottom: "4rem" }}>
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

            <div className="p-input-icon-left p-float-label" style={{ marginBottom: "3rem" }}>
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


           


            <Button type='submit' label="Login" severity="success" raised style={{ width: '100%' }} />


            <div className="divider d-flex align-items-center justify-content-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>



            <i class="bi bi-google"></i>
            <div className="card flex flex-wrap justify-content-center gap-3">



              <Button icon="pi pi-fw pi-google" className="p-button-text-icon-left" outlined
                label={<span>Sign in with <span style={{ color: '#34A853' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#EA4335' }}>l</span><span style={{ color: '#34A853' }}>e</span></span>}
              />
            </div>
          </form>

          <Link to={'/signup'}>
          <div className="card flex flex-wrap justify-content-center gap-3" style={{ marginTop: "2rem" }}>
          <Button className="p-button-text-icon-left" outlined severity="primary"
                label='New Member ? SignUp'
              />
          </div>
          </Link>


        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Test;