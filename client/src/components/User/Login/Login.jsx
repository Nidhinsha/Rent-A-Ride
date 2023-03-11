import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { userLogin } from '../../../Redux/Actions/userActions'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userlogin = useSelector(state => state.userLogin)
    const {error,loading,data} = userlogin

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // redirecting into the home after login .. 
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
        if (userInfo) {
          navigate('/');
        }
      }, [data, navigate]);

    // submitting the data 
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(userLogin(email,password))
    }

    return (
        <div>
            <form action="">
        {error ? <div>{error}</div> : ""}
        {loading ? 'loading...' : ""}
                <input
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    type="text"
                    name="email"
                />
                <input
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    type="password"
                    name="password"
                />

                <button onClick={handleSubmit} >Login</button>
            </form>

            <div>
                <Link to={'/signup'}>signup</Link>
            </div>
        </div>
    )
}

export default Login
