
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

  const { register, handleSubmit, formState: { errors } } = useForm()

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => { },
        },
        auth
      );
    }
  }

  function onSignup() {

    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const phoneNumber = "+" + phone;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;

        setShowOtp(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        toast.error("an error occured!");

      });
  }

  function onOTPVerify() {

    window.confirmationResult
      .confirm(otp)
      .then(async (result) => {
        const phone = result.user.phoneNumber.substring(3)

        dispatch(userOtpLoginAction(phone))
        toast.success('Logged in successfully!')

      })
      .catch((err) => {
         toast.error("an error occured!");
      });
  }



  return (
    <div className='otp-login'>
      <div id='recaptcha-container'></div>
      <Toaster toastOptions={{ duration: 4000 }}></Toaster>

      <div className='login-box'>

        {
          showOtp ?
           

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f2f2f2' }} className='login-body'>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }} className='login-header'>Verify OTP</h2>
              <div className='form-div'>
                <label htmlFor="">Enter the OTP*</label>
                <input type="text" placeholder='OTP'
                  {...register('OTP', {
                    required: true,
                    maxLength: 6,
                    minLength: 6,
                  })}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #ccc', marginBottom: '1rem' }}
                />
                {errors.OTP && <p style={{ color: "red" }}>Please check the OTP</p>}
                <Button type='submit' className='otp-button' style={{ backgroundColor: '#0e7be8', color: 'white', padding: '0.5rem', borderRadius: '0.25rem', border: 'none' }}
                  onClick={onOTPVerify}
                >
                  LOGIN
                </Button>
                {/* </Form> */}
                <div id='recaptcha-container'></div>
              </div>
            </div>
            :
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <div className='login-body' style={{ maxWidth: '400px', width: '100%', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
                <h2 className='login-header'>OTP Login</h2>
                <div className='form-div'>
                  <label htmlFor="">Enter the mobile no*</label>
                  <PhoneInput country={"in"}
                    value={phone}
                    onChange={setPhone}
                  />
                  {errors.phone && <p style={{ color: "red" }}>Please check the Mobile No</p>}
                  <Button type='submit' className='otp-button'
                    style={{ backgroundColor: '#0e7be8', color: 'white', marginTop: '10px' }}
                    onClick={onSignup}
                  >Send OTP via SMS</Button>
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default OtpLogin
