import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin } from '../../../Redux/Actions/adminActions'

function AdminLogin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const adminlogin = useSelector((state)=> state.adminLogin)

    const {loading,error} = adminlogin

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(adminLogin(email,password))
    }
    return (
        <div>
            <div>
                <form action="">
                {/* error showing */}
                {error ? error : ""}
                {/* loading showing */}
                {loading ? "Loading.." : ""}

                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="input1"
                        type="email"
                        name="email"
                        id=""
                        placeholder="Email"
                    />

                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Password..."
                    />
                    <div>
                        <button onClick={handleSubmit}>login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
