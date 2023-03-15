import {
    ADMIN_LOGIN_REQUEST,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL,
    ADMIN_LOGOUT,

    ADMIN_USER_FETCH_REQUEST,
    ADMIN_USER_FETCH_SUCCESS,
    ADMIN_USER_FETCH_FAIL

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

export const adminLogOut = () => async (dispatch)=>{
    localStorage.removeItem("adminInfo")
    dispatch({type:ADMIN_LOGOUT})
}

export const adminUserFetchAction = () => async (dispatch) => {
    try {
        dispatch({type : ADMIN_USER_FETCH_REQUEST})

        const token = JSON.parse(localStorage.getItem("adminInfo"))
        console.log(token.token);

        const config = {
            headers: {
                Authorization: "Bearer "+ token.token

            }
        }

        const {data} = await axios.get("http://localhost:5000/admin/user-manage",config)

        console.log(data,'adction user data');
        dispatch({type: ADMIN_USER_FETCH_SUCCESS,payload : data})

    } catch (error) {
        dispatch({
            type:ADMIN_USER_FETCH_FAIL,
            payload : 
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.response.data
        })
    }
}