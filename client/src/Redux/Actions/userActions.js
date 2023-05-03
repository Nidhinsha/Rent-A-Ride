import { userActionType } from '../Constants/userConstants'
import { getBikeWithBrandAPI, getBrandsAPI, googleSignupAPI, homeBikeDataAPI, searchBikesAPI, userBookingBikeAPI, userCancelBookingAPI, userCreateOrderAPI, userFinePaymentSuccessAPI, userGetAcceptedBikeAPI, userGetAllRentedBikeAPI, userGetBikeAPI, userGetBookedBikeAPI, userGetCouponAPI, userGetLocationAPI, userGetPendingBikeAPI, userGetRejectedBikeAPI, userGetWalletAPI, userHomeAPI, userImageUploadAPI, userLoginAPI, userOtpLoginAPI, userPayFineAPI, userProfileAPI, userProofUploadAPI, userSignUpAPI } from '../../Api/User/ApiCalls'
// import {  useNavigate } from 'react-router-dom'



// user signup

export const userSignupAction = (data) => async (dispatch) => {
  // const navigate = useNavigate()
  try {

    // dispatch({
    //   type: userActionType.USER_SIGNUP_REQUEST
    // })

    // userSignUpAPI(firstName, lastName, email, phone, password,referalCode)
    //   .then((data) => {
    //     window.location.href = "/login"
    //     // navigate("/login")
    //     dispatch({
    //       type: userActionType.USER_SIGNUP_SUCCESS,
    //       payload: data
    //     })
    //   })
    //   .catch((error) => {
    //     dispatch({
    //       type: userActionType.USER_SIGNUP_FAIL,
    //       payload: error.response.data.message
    //     })
    //   })
    dispatch({
      type: userActionType.USER_SIGNUP_SUCCESS,
          payload: data
    })
  } catch (error) {
  }
}

// user login

export const userLoginAction = (email, password) => async (dispatch) => {
 
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
          payload: error.response.data.message
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

    // await localStorage.setItem("userInfo", JSON.stringify(data))

    // navigate to home page after localStorage operation is complete
    // window.location.href = "/"

  } catch (error) {
    dispatch({
      type: userActionType.GOOGLE_SIGNUP_FAIL,
      payload: error.response.data.message
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
      payload :error.response.data.message
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
          payload: error.response.data.message
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
        payload : error.response.data.message
      })
    })
  } catch (error) {
    
  }
}

export const homeBikeAction=()=>async(dispatch)=>{
  dispatch({
    type : userActionType.HOME_BIKE_REQUEST
  })

  homeBikeDataAPI().then((data)=>{
    dispatch({
      type : userActionType.HOME_BIKE_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.HOME_BIKE_FAIL,
      payload : error.response.data.message
    })
  })
}

export const userBikeSearchAction = (searchTerm,page)=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_GET_SEARCH_BIKES_REQUEST
  })

  searchBikesAPI(searchTerm,page).then((data)=>{
    dispatch({
      type : userActionType.USER_GET_SEARCH_BIKES_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type : userActionType.USER_GET_SEARCH_BIKES_FAIL,
      payload : error.response.data.message
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
      payload : error.response.data.message
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
      payload :error.response.data.message
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
      payload :error.response.data.message
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
      payload :error.response.data.message
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
      payload :error.response.data.message
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
      payload : error.response.data.message
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
      payload : error.response.data.message
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
      payload:data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type:userActionType.USER_CANCEL_BOOKED_BIKE_FAIL,
      paylooad : error.response.data.message
    })
  })
}

export const userEndBookedBikeAction =(data)=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_END_BOOKED_BIKE_SUCCESS,
    payload : data
  })
  
}
// pay fine
export const userPayFineAction =(fineData)=>async(dispatch)=>{
  dispatch({
    type : userActionType.USER_PAY_FINE_REQUEST
  })

  userPayFineAPI(fineData).then((data)=>{
    if(data.data.url){
      window.location.href = data.data.url
    }
  })
  .catch((error)=>{
    dispatch({
      type:userActionType.USER_PAY_FINE_FAIL,
      payload:error.response.data.message
    })
  })
}

export const userFinePaymentSuccessAction =(fineData)=>async(dispatch)=>{
  userFinePaymentSuccessAPI(fineData).then((data)=>{
    dispatch({
      type:userActionType.USER_FINE_PAYMENT_SUCCESS,
      payload:data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type:userActionType.USER_FINE_PAYMENT_FAIL,
      payload:error.response.data.message
    })
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
        payload : error.response.data.message
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
      payload : error.response.data.message
    })
  })
}

export const getBrandsAction =()=>async(dispatch)=>{
  dispatch({
    type : userActionType.GET_BRANDS_REQUEST
  })

  getBrandsAPI().then((data)=>{
    dispatch({
      type : userActionType.GET_BRANDS_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
     type:userActionType.GET_BRANDS_FAIL,
     payload : error.response.data.message
    })
  })
}

export const getBikeWithBrandAction =(brand,color,page)=>async(dispatch)=>{
  dispatch({
    type : userActionType.GET_BIKE_WITH_BRAND_REQUST
  })

  getBikeWithBrandAPI(brand,color,page).then((data)=>{
   
    dispatch({
      type : userActionType.GET_BIKE_WITH_BRAND_SUCCESS,
      payload : data.data
    })
  })
  .catch((error)=>{
    dispatch({
      type:userActionType.GET_BIKE_WITH_BRAND_FAIL,
      payload : error.response.data.message
    })
  })
}