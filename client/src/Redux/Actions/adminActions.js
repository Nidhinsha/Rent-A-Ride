import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL
} from "../Constants/adminConstants"

import axios from "axios"


export const adminLogin =(email,password)=> async (dispatch)=>{
    try {
        dispatch({type : ADMIN_LOGIN_REQUEST})

        const config = {
            headers:{
                "Content-type": "application/json"
            }
        }

        const {data} = await axios.post(
            "http://localhost:5000/admin/login" ,
            {email,password},
            config
        )
        dispatch({type:ADMIN_LOGIN_SUCCESS , payload:data})

        localStorage.setItem("adminInfo",JSON.stringify(data))

    } catch (error) {
        dispatch({type:ADMIN_LOGIN_FAIL,
                payload :
                    error.message && error.response.data.message
                    ? error.response.data.message
                    : error.response.data})
    }
}