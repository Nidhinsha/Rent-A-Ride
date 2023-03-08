import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userSignup } from '../../../Redux/Actions/userActions';
function Signup() {

    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [password,setPassword] = useState('')


    const dispatch = useDispatch()
    const handleSubmit =(e) =>{
        e.preventDefault()
        console.log(firstName,lastName,email,phone,password);

        dispatch(userSignup(firstName,lastName,email,phone,password))
    }
  return (
    <div>
        <form action="">

        <input 
      onChange={(e)=>{
        setFirstName(e.target.value)
      }}
      type="text" 
      name="firstName"
      
       />
      <input 
      onChange={(e)=>{
        setLastName(e.target.value)
      }}
      type="text" 
      name="lastName"
      
       />
      <input 
      onChange={(e)=>{
        setEmail(e.target.value)
      }}
      type="email" 
      name="email"
      
       />
      <input 
      onChange={(e)=>{
        setPhone(e.target.value)
      }}
      type="number" 
      name="phone"
      
       />
    
      <input 
      onChange={(e)=>{
        setPassword(e.target.value)
      }}
      type="password" 
      name="password"
      
       />

       <button onClick={handleSubmit}>submit</button>
        </form>
     
    </div>
  )
}

export default Signup
