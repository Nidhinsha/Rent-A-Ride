import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

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