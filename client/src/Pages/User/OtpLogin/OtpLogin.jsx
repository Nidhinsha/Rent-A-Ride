// import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
// import { CgSpinner } from "react-icons/cg";

// import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form'
import { userOtpLoginAction } from "../../../Redux/Actions/userActions";

function OtpLogin() {

    const [otp, setOtp] = useState("")
    const [phone, setPhone] = useState("")
    const [showOtp, setShowOtp] = useState(false)
    const [user, setUser] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register,handleSubmit,formState : {errors}} = useForm()  

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
      }

      function onSignup() {
        
        onCaptchVerify();
    
        const appVerifier = window.recaptchaVerifier;
    
        const phoneNumber  = "+" + phone;
    
        signInWithPhoneNumber(auth, phoneNumber , appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            
            setShowOtp(true);
            toast.success("OTP sended successfully!");
          })
          .catch((error) => {
            console.log('otp error',error);
            
          });
      }

      function onOTPVerify() {
   
        window.confirmationResult
          .confirm(otp)
          .then(async (result) => {
            console.log('result',result);
            console.log("mobile",result.user.phoneNumber );
            const phone =  result.user.phoneNumber.substring(3)
            console.log("MOBILE",phone);

            dispatch(userOtpLoginAction(phone))
            toast.success('Logged in successfully!')
            
          })
          .catch((err) => {
            console.log(err);
         
          });
      }
    


    return (
        <div className='otp-login'>
      <div id='recaptcha-container'></div>
      <Toaster toastOptions={{duration:4000}}></Toaster>
      {/* <div className='img-div'>
        <img src = {require('../../../ASSETS/Images/otpLogin.jpg')}  alt="" />
      </div> */}
      
      
      
      <div className='login-box'>
      
      {
            showOtp ? 
            <div className='login-body'>
            <h2 className = 'login-header'>Verify OTP</h2>
            <div className='form-div'>
           
                {/* <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Field> */}
                        <label htmlFor="">Enter the OTP*</label>
                        
                        <input type="text" placeholder='OTP'
                        {...register('OTP',{
                            required : true,
                            maxLength : 6,
                            minLength : 6,
                        })} 
                        onChange = {(e) => setOtp(e.target.value)}
                         />
                       
                    
                    {errors.OTP && <p style={{color : "red"}}>Please check the OTP</p>}
                    <Button type='submit' className='otp-button' style= {{backgroundColor : '#0e7be8',color : 'white'}} 
                     onClick={onOTPVerify}
                    >
                     
                      LOGIN</Button>
                {/* </Form> */}
                <div id='recaptcha-container'></div>
            </div>
         </div> : 
         
         <div className='login-body'>
            <h2 className = 'login-header'>OTP Login</h2>
            <div className='form-div'>
                {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
                    {/* <Form.Field> */}
                        <label htmlFor="">Enter the mobile no*</label>
                        <PhoneInput country={"in"} 
                        value={phone}
                        onChange={setPhone}
                        // style={{width:"30rem"}}
                        />
                       
                     
                    {errors.phone && <p style={{color : "red"}}>Please check the Mobile No</p>}
                    <Button type='submit' className='otp-button' 
                    style= {{backgroundColor : '#0e7be8',color : 'white'}}
                    onClick={onSignup}
                    >Send OTP via SMS</Button>
                
            </div>
         </div>

          }
         

         
         
      </div>
    </div>
  )
}

export default OtpLogin
