import { userActionType } from '../Constants/userConstants'
import { googleSignupAPI, searchBikesAPI, userBookingBikeAPI, userCancelBookingAPI, userCreateOrderAPI, userGetAcceptedBikeAPI, userGetAllRentedBikeAPI, userGetBikeAPI, userGetBookedBikeAPI, userGetCouponAPI, userGetLocationAPI, userGetPendingBikeAPI, userGetRejectedBikeAPI, userGetWalletAPI, userHomeAPI, userImageUploadAPI, userLoginAPI, userOtpLoginAPI, userProfileAPI, userProofUploadAPI, userSignUpAPI } from '../../Api/User/ApiCalls'
import { getAllUserContacts } from '../../Api/User/ApiCalls'



// user signup

export const userSignup = (firstName, lastName, email, phone, password,referalCode) => async (dispatch) => {
  
  try {

    dispatch({
      type: userActionType.USER_SIGNUP_REQUEST
    })

    userSignUpAPI(firstName, lastName, email, phone, password,referalCode)
      .then((data) => {

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
      })
  } catch (error) {
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

        dispatch({
          type: userActionType.USER_LOGIN_SUCCESS,
          payload: data.data
        })

        localStorage.setItem("userInfo", JSON.stringify(data.data))
      })
      .catch((error) => {

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

// google signup


export const googleSignupAction = (firstName, lastName, email, phone, photo) => async (dispatch) => {
  try {
    dispatch({
      type: userActionType.GOOGLE_SIGNUP_REQUEST,
    })

    const { data } = await googleSignupAPI(firstName, lastName, email, phone, photo)

    dispatch({
      type: userActionType.GOOGLE_SIGNUP_SUCCESS,
      payload: data,
    })

    await localStorage.setItem("userInfo", JSON.stringify(data))

    // navigate to home page after localStorage operation is complete
    window.location.href = "/"
  } catch (error) {
    dispatch({
      type: userActionType.GOOGLE_SIGNUP_FAIL,
      payload: error.response.message,
    })
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

    userProfileAPI(user.id).then((data) => {

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

    userImageUploadAPI(user.id, image).then((data) => {

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

    userProofUploadAPI(user.id,image).then((data)=>{

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

export const userGetBikeAction = (page) => async (dispatch)=>{

  try {
    
    dispatch({
      type : userActionType.USER_GET_BIKES_REQUEST
    })

    userGetBikeAPI(page).then((data)=>{

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
    dispatch({
      type : userActionType.USER_GET_LOCATION_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.USER_GET_LOCATION_FAIL,
      payload : error.response.message
    })
  })
}

// USER BOOKING BIKE

export const userBookingBikeAction =(bookingData)=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_BOOKING_BIKE_REQUEST
  })

  userBookingBikeAPI(bookingData).then((data)=>{

    if(data.data.url){
      window.location.href= data.data.url
    }else{
      dispatch({
        type :userActionType.USER_WALLET_BOOKING_SUCCESS,
        payload : data.data?.message
      })
    }
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.USER_BOOKING_BIKE_FAIL,
      payload : error.response.data
    })
  })
}

// CREATE ORDER 

export const userCreateOrderAction=(bookingDetails)=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_CREATE_ORDER_REQUEST
  })

  userCreateOrderAPI(bookingDetails).then((data)=>{
  })
  .catch((error)=>{
  })
}

export const userGetBookedBikeAction =(id)=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_GET_BOOKED_BIKE_REQUEST
  })

  userGetBookedBikeAPI(id).then((data)=>{
    dispatch({
      type : userActionType.USER_GET_BOOKED_BIKE_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.USER_GET_BOOKED_BIKE_FAIL,
      payload : error.response.message
    })
  })
}

export const userCancelBookedBikeAction =(bikeId,bookingId,startTime,endTime,price,userId)=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_CANCEL_BOOKED_BIKE_REQUEST
  })

  userCancelBookingAPI(bikeId,bookingId,startTime,endTime,price,userId,).then((data)=>{
    dispatch({
      type :userActionType.USER_CANCEL_BOOKED_BIKE_SUCCESS,
      payload:data.bookingData
    })
  })
  .catch((error)=>{
    dispatch({
      type:userActionType.USER_CANCEL_BOOKED_BIKE_FAIL,
      paylooad : error.data
    })
  })
}

export const userEndBookedBikeAction =(data)=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_END_BOOKED_BIKE_SUCCESS,
    payload : data
  })
  
}

export const userGetCouponsAction =()=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_GET_COUPON_REQUEST
})

userGetCouponAPI().then((data)=>{
    dispatch({
        type : userActionType.USER_GET_COUPON_SUCCESS,
        payload : data.data
    })
})
.catch((error)=>{
    dispatch({
        type : userActionType.USER_GET_COUPON_FAIL,
        payload : error.response.message
    })
})
}

export const userGetWalletAction =()=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_GET_WALLET_REQUEST
  })

  userGetWalletAPI().then((data)=>{
    dispatch({
      type : userActionType.USER_GET_WALLET_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type:userActionType.USER_GET_WALLET_FAIL,
      payload : error.response.data
    })
  })
}