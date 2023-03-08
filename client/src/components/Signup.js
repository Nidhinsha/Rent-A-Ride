import React, { useState,useNavigate } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


function Signup() {

    const [data,setData] = useState({
        fullName:"",
        email:"",
        phone:"",
        password:""
    })

    const [error,setError] = useState("")

    const navigate = useNavigate()

    const handleChange = ({currentTarget : input}) =>{
        setData({...data,[input.name]:input.value})
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        try {
            const url = 'http://localhost:3005/users/signup'
            const {data:res} = await axios.post(url,data)
            console.log(res.message);
        } catch (error) {
            if(error.response && 
                error.response.status >= 400 &&
                error.response.status <= 500){
                    setError(error.response.data.message)
                }
        }
    }
    return (
        <div>
            <div>hi wekcome back </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='fullName'value={data.fullName} onChange={handleChange}/>
                    <input type='email' name='email' value={data.email} onChange={handleChange}/>
                    <input type='number' name='phone'value={data.phone} onChange={handleChange}/>
                    <input type='password' name='password' value={data.password} onChange={handleChange} />
                    {error && <div>{error}</div>}
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    )
    }

export default Signup
