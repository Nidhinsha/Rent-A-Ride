import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,

    USER_LOGOUT
} from '../Constants/userConstants'

import axios from 'axios'

// user signup

export const userSignup =
  (firstName, lastName, email,phone , password) => async (dispatch) => {
    console.log(firstName);
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/user-signup",
        { firstName, lastName,phone, email, password },
        config
      );
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
      console.log(error.response.data);
    }
  }

  // user login 

  export const userLogin = (email,password) =>async(dispatch) => {
    console.log(email,password,'lllllllllllll');

    try {
      dispatch({type : USER_LOGIN_REQUEST});

      const config = {
        header:{
          "Content-type" : "application/json"
        }
      }

      const { data } = await axios.post(
        "http://localhost:5000/user-login",
        {email,password},
        config
      )

      dispatch({type:USER_LOGIN_SUCCESS,payload : data})
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      
      dispatch({type :USER_LOGIN_FAIL ,
         payload :
          error.response && error.response.data.message 
          ? error.response.data.message
          : error.response.data
      })
      console.log(error.response.data);
    }
  }

  // USER LOGOUT 

  export const userLogout = () => async (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({type:USER_LOGOUT})
  }

  // USER PROFILE

  export const userProfile = () => async (dispatch) => {
    try {
      dispatch({type : USER_PROFILE_REQUEST})

      const token = JSON.parse(localStorage.getItem("userInfo"))
      console.log(token.token,'token getting from local storege');

      const config = {
        headers : {
          Authorization : "Bearer " + token.token,
        }
      }

      const {data} = await axios.get(
        "http://localhost:5000/profile?id=" + token._id,
        config 
      )
        console.log(data,'data');
      dispatch({type:USER_PROFILE_SUCCESS,payload : data})

    } catch (error) {
      dispatch({type:USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message 
          : error.message
        })
    }
  }