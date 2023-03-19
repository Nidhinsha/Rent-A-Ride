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
import { userLogin, userSignup } from '../../../Redux/Actions/userActions'
import ErrorMessage from '../../../components/Alert/Error'
import Loading from '../../../components/Loading/Loading'
import { useForm } from "react-hook-form";
import './Login.css'



import { auth,provider } from '../../../firebase/config';
import {signInWithPopup} from 'firebase/auth'

function Login() {


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
        // const googleUser = JSON.parse(localStorage.getItem('user'))
        if (userInfo ) {
          navigate('/');
          clearInterval(interval); // clear the interval once userInfo is available
        }
      }, 1000)
    
      return () => clearInterval(interval); // clear the interval on unmount
    }, [navigate,userLoginDetails]);
 
    const handleGoogle = () =>{
      signInWithPopup(auth,provider).then((data)=>{
        // setEmail(data.user.email)
        let fullName = data.user.displayName
        const [firstName,lastName] = fullName.split(' ')
        // const value = {
        //   firstName : firstName,
        //   lastName : lastName ,
        //   email : data.user.email
  
        // }
        localStorage.setItem('user',data.user.email)
        navigate('/')
        console.log(firstName,lastName,'ttttt');
  
         dispatch(userSignup(firstName,lastName, data.user.email, data.user.phoneNumber,firstName))
        console.log(data.user,'gogle user data');
      })
    }


  return (
    <MDBContainer fluid className="p-3 my-5">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://cdn.discordapp.com/attachments/1008571132938555432/1086965739522637884/pekka_a_person_sitting_on_a_scooter_blue_illustration__white_ba_630badc6-1414-41e6-b2ec-03f2425615b8.png"
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


           


            <Button type='submit' label="Login" severity="primary" raised style={{ width: '100%' }} />


            <div className="divider d-flex align-items-center justify-content-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>



            <i class="bi bi-google"></i>
            <div className="card flex flex-wrap justify-content-center gap-3">



              <Button icon="pi pi-fw pi-google" className="p-button-text-icon-left" outlined
                label={<span>Sign in with <span style={{ color: '#34A853' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#EA4335' }}>l</span><span style={{ color: '#34A853' }}>e</span></span>}
                onClick={handleGoogle}
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

export default Login;