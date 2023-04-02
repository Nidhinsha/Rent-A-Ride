import { userActionType } from '../Constants/userConstants'
import { searchBikesAPI, userGetAcceptedBikeAPI, userGetAllRentedBikeAPI, userGetBikeAPI, userGetLocationAPI, userGetPendingBikeAPI, userGetRejectedBikeAPI, userHomeAPI, userImageUploadAPI, userLoginAPI, userOtpLoginAPI, userProfileAPI, userProofUploadAPI, userSignUpAPI } from '../../Api/User/ApiCalls'



// user signup

export const userSignup = (firstName, lastName, email, phone, password) => async (dispatch) => {
  
  try {

    dispatch({
      type: userActionType.USER_SIGNUP_REQUEST
    })

    userSignUpAPI(firstName, lastName, email, phone, password)
      .then((data) => {
        console.log("api data", data.data)

        dispatch({
          type: userActionType.USER_SIGNUP_SUCCESS,
          payload: data
        })
      })
      .catch((error) => {
        dispatch({
          type: userActionType.USER_SIGNUP_FAIL,
          payload: error.response.data
        })
        console.log('error in user signup action', error);
      })
  } catch (error) {
    console.log('eroor', error);
  }
}

// user login

export const userLogin = (email, password) => async (dispatch) => {
 
  try {
    dispatch({
      type: userActionType.USER_LOGIN_REQUEST
    })

    userLoginAPI(email, password)
      .then((data) => {
        console.log('login data of user ', data.data);

        dispatch({
          type: userActionType.USER_LOGIN_SUCCESS,
          payload: data.data
        })

        localStorage.setItem("userInfo", JSON.stringify(data.data))
      })
      .catch((error) => {
        console.log("userlogin error", error);

        dispatch({
          type: userActionType.USER_LOGIN_FAIL,
          payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data
        })
      })
  } catch (error) {

  }
}

// otp login

export const userOtpLoginAction =(phone) =>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_LOGIN_REQUEST
  })

  userOtpLoginAPI(phone).then((data)=>{
    dispatch({
      type : userActionType.USER_LOGIN_SUCCESS,
      payload : data.data
    })
    localStorage.setItem("userInfo",JSON.stringify(data.data))
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.USER_LOGIN_FAIL,
      payload : error.response
    })
  })
}

// user logout

export const userLogOut = () => async (dispatch) => {

  try {
    localStorage.removeItem("userInfo")

    dispatch({
      type: userActionType.USER_LOGOUT
    })
  } catch (error) {

  }
}



// USER PROFILE
export const getUserProfileAction = () => async (dispatch) => {

  try {
    dispatch({ type: userActionType.GET_USER_PROFILE_REQUEST });

    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log("user tokeusern in profile",user.id);

    userProfileAPI(user.id).then((data) => {
      console.log('profile dta', data.data);

      dispatch({
        type: userActionType.GET_USER_PROFILE_SUCCESS,
        payload: data.data
      })
    })
      .catch((error) => {
        dispatch({
          type: userActionType.GET_USER_PROFILE_FAIL,
          payload: error.response.data
        })
      })
  } catch (error) {

  }
};


// user image upload 

export const userImageAction = (image) => async (dispatch) => {

  try {

    const user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user.id + "tttttttttttttttttttt");


    userImageUploadAPI(user.id, image).then((data) => {
      console.log("image upload api data", data.data);

      localStorage.setItem("userInfo", JSON.stringify(data.data))

      dispatch({
        type: userActionType.UPDATE_USER_PROFILE,
        payload: data.data
      })
    })
  } catch (error) {


  }
};

export const userProofAction =(image) => async(dispatch)=>{
  try {
    const user = JSON.parse(localStorage.getItem("userInfo"))
    console.log('userid in proof',user.id);

    userProofUploadAPI(user.id,image).then((data)=>{
      console.log('proof api data',data.data);

      localStorage.setItem("userInfo",JSON.stringify(data.data))

      dispatch({
        type : userActionType.UPDATE_USER_PROFILE,
        payload : data.data
      })
    })
  } catch (error) {
    
  }
}

export const updateUserProfileAction = (data)=>async(dispatch)=>{
  try {
    dispatch({
      type : userActionType.UPDATE_USER_PROFILE_DETAILS,
      payload : data
    })
  } catch (error) {
    
  }
}

export const userGetBikeAction = () => async (dispatch)=>{

  try {
    
    dispatch({
      type : userActionType.USER_GET_BIKES_REQUEST
    })

    userGetBikeAPI().then((data)=>{
      console.log('bike for mmm',data.data);

      dispatch({
        type  : userActionType.USER_GET_BIKES_SUCCESS,
        payload : data.data
      })
    })
    .catch((error)=>{
      dispatch({
        type : userActionType.USER_GET_BIKES_FAIL,
        payload : error.response.message
      })
    })
  } catch (error) {
    
  }
}

export const userBikeSearchAction = (searchTerm)=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_GET_SEARCH_BIKES_REQUEST
  })

  searchBikesAPI(searchTerm).then((data)=>{
    dispatch({
      type : userActionType.USER_GET_SEARCH_BIKES_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.USER_GET_SEARCH_BIKES_FAIL,
      payload : error.response.message
    })
  })
}


export const userGetAllRentedBikes =() => async(dispatch)=>{
  dispatch({
    type : userActionType.USER_GET_ALL_RENTED_BIKES_REQUEST
  })

  userGetAllRentedBikeAPI().then((data)=>{
    dispatch({
      type : userActionType.USER_GET_ALL_RENTED_BIKES_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.USER_GET_ALL_RENTED_BIKES_FAIL,
      payload : error.response.message
    })
  })
}

export const userGetAcceptedBikes =()=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_GET_ACCEPTED_BIKES_REQUEST
  })

  userGetAcceptedBikeAPI().then((data)=>{
    dispatch({
      type : userActionType.USER_GET_ACCEPTED_BIKES_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.USER_GET_ACCEPTED_BIKES_FAIL,
      payload : error.response.message
    })
  })
}
export const userGetRejectedBikes =()=>async(dispatch)=>{
  console.log('rejected action');
  dispatch({
    type : userActionType.USER_GET_REJECTED_BIKES_REQUEST
  })

  userGetRejectedBikeAPI().then((data)=>{
    dispatch({
      type : userActionType.USER_GET_REJECTED_BIKES_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.USER_GET_REJECTED_BIKES_FAIL,
      payload : error.response.message
    })
  })
}
export const userGetPendingBikes =()=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_GET_PENDING_BIKES_REQUEST
  })

  userGetPendingBikeAPI().then((data)=>{
    dispatch({
      type : userActionType.USER_GET_PENDING_BIKES_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.USER_GET_PENDING_BIKES_FAIL,
      payload : error.response.message
    })
  })
}

export const userGetLocation =()=> async(dispatch)=>{
  dispatch({
    type : userActionType.USER_GET_LOCATION_REQUEST
  })

  userGetLocationAPI().then((data)=>{
    console.log('user location',data.data);

    dispatch({
      type : userActionType.USER_GET_LOCATION_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    console.log('user location err in action');

    dispatch({
      type : userActionType.USER_GET_LOCATION_FAIL,
      payload : error.response.message
    })
  })
}