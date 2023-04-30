
import { userActionType } from "../Constants/userConstants";


export const userSignupReducer = (state = {}, action) => {
    switch (action.type) {
        case userActionType.USER_SIGNUP_REQUEST:

            return { 
              loading: true 
            }

        case userActionType.USER_SIGNUP_SUCCESS:

            return { 
              loading: false, 
              signUpData: action.payload 
            };
        case userActionType.USER_SIGNUP_FAIL:

            return {
               loading: false,
                signUpError: action.payload 
              };

        default:
            return state;
    }
}


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {

        case userActionType.USER_LOGIN_REQUEST:
            return {
               loading: true
               }

        case userActionType.USER_LOGIN_SUCCESS:
            return { 
              loading: false,
               userLoginDetails: action.payload
              }

        case userActionType.USER_LOGIN_FAIL:
            return { 
              loading: false,
               userLoginError: action.payload 
              }

        case userActionType.USER_LOGOUT:
            return {
              userLoginDetails:false
            }

        case userActionType.UPDATE_USER_PROFILE :
          return {
            userLoginDetails : action.payload
          }
        
        case userActionType.UPDATE_USER_PROFILE_DETAILS:
          return {
            userLoginDetails : action.payload
          }

        default:
            return state
    }
}

export const googleSignupReducer =(state={},action)=>{
  switch (action) {
    case userActionType.GOOGLE_SIGNUP_REQUEST:
      return{
        googleLoading : true
      }
    case userActionType.GOOGLE_SIGNUP_SUCCESS:
      return {
        googleLoading : false,
        googleSignupData : action.payload
      }
    case userActionType.GOOGLE_SIGNUP_FAIL:
      return {
        googleLoading : false,
        googleSignupError : action.payload
      }
  
    default:
      return  state;
  }
}

export const getUserProfileReduer = (state = {}, action) => {

  switch (action.type) {
    case userActionType.GET_USER_PROFILE_REQUEST:

      return { 
        loading: true
       }

    case userActionType.GET_USER_PROFILE_SUCCESS:
      return { 
        loading: false,
         userProfileData: action.payload
         };

    case userActionType.GET_USER_PROFILE_FAIL:
      return { 
        loading: false,
        userProfileDataError: action.payload };
   
    default:
      return state;
  }
};

export const userImageUplaodReducer = (state = {}, action) => {
  switch (action.type) {
    case userActionType.USER_UPLOAD_IMAGE_REQUEST:
      return { 
        ImageLoading: true 
      };

    case userActionType.USER_UPLOAD_IMAGE_SUCCESS:
      return { 
        imageLoading: false,
         profilePicture: action.payload
         };

    case userActionType.USER_UPLOAD_IMAGE_FAIL:
      return { 
        imageLoading: false,
         imageError: action.payload
         };
    default:
      return state;
  }
};


export const userProofUploadReducer = (state={},action)=>{
  switch(action.type){
    case userActionType.USER_UPLOAD_PROOF_REQUEST:
      return {
        proofLoading : true
      }
    case userActionType.USER_UPLOAD_PROOF_SUCCESS:
      return {
        proofLoading : false,
        userProof : action.payload
      }
    case userActionType.USER_UPLOAD_PROOF_FAIL:
      return {
        proofLoading:false,
        proofEroor : action.payload
      }
    default:
      return state
  }
}

export const userGetBikeReducer =(state={},action)=>{
  switch (action.type) {
    case userActionType.USER_GET_BIKES_REQUEST:
      return {
        bikesDataLoading : true
      }
    case userActionType.USER_GET_BIKES_SUCCESS:
      return {
        loading : false,
        bikesData : action.payload
      }
    case userActionType.USER_GET_BIKES_FAIL:
      return {
        loading : false,
        bikesDataError : action.payload
      }
    case userActionType.USER_GET_SEARCH_BIKES_REQUEST:
      return {
        searchLoading : true
      }
    case userActionType.USER_GET_SEARCH_BIKES_SUCCESS:
      return {
        searchLoading : false,
        bikesData : action.payload
      }
    case userActionType.USER_GET_SEARCH_BIKES_FAIL:
      return {
        searchLoading : false,
        bikesDataError : action.payload
      }
    case userActionType.GET_BIKE_WITH_BRAND_REQUST:
      return {
        loading : true
      }
    case userActionType.GET_BIKE_WITH_BRAND_SUCCESS:
      return {
        loading : false,
        bikesData : action.payload
      }
    case userActionType.GET_BIKE_WITH_BRAND_FAIL:
      return {
        loading : false,
        brandBikesDataError : action.payload
      }
    default :
      return state
  }
}

export const homeBikeReducer = (state={},action)=>{
  switch(action.type){
    case userActionType.HOME_BIKE_REQUEST:
      return {
        loading : true
      }
    case userActionType.HOME_BIKE_SUCCESS:
      return {
        loading : false,
        bikesData : action.payload
      }
    case userActionType.HOME_BIKE_FAIL:
      return {
        loading : false,
        bikeDataError : action.payload
      }
    
    default :
      return state
  }
}

export const userGetAllRentedBikesReducer = (state={},action)=>{
  switch(action.type){
    case userActionType.USER_GET_ALL_RENTED_BIKES_REQUEST:
      return {
        loading : true
      }
    case userActionType.USER_GET_ALL_RENTED_BIKES_SUCCESS:
      return {
        loading : false,
        rentedBikesData : action.payload
      }
    case userActionType.USER_GET_ALL_RENTED_BIKES_FAIL:
      return {
        loading : false,
        rentedBikesDataError : action.payload
      }
    
    default :
      return state
  }
}

export const userGetAcceptedBikeReducer = (state={},action)=>{
  switch(action.type){
    case userActionType.USER_GET_ACCEPTED_BIKES_REQUEST:
      return {
        loading : true
      }
    case userActionType.USER_GET_ACCEPTED_BIKES_SUCCESS:
      return {
        loading : false,
        acceptedBikesData : action.payload
      }
    case userActionType.USER_GET_ACCEPTED_BIKES_FAIL:
      return {
        loading : false,
        acceptedBikesDataError : action.payload
      }
    
    default :
      return state
  }
}

export const userGetPendingBikeReducer = (state={},action)=>{
  switch(action.type){
    case userActionType.USER_GET_PENDING_BIKES_REQUEST:
      return {
        loading : true
      }
    case userActionType.USER_GET_PENDING_BIKES_SUCCESS:
      return {
        loading : false,
        pendingBikesData : action.payload
      }
    case userActionType.USER_GET_PENDING_BIKES_FAIL:
      return {
        loading : false,
        pendingBikesDataError : action.payload
      }
    
    default :
      return state
  }
}
export const userGetRejectedBikeReducer = (state={},action)=>{
  switch(action.type){
    case userActionType.USER_GET_REJECTED_BIKES_REQUEST:
      return {
        loading : true
      }
    case userActionType.USER_GET_REJECTED_BIKES_SUCCESS:
      return {
        loading : false,
        rejectedBikesData : action.payload
      }
    case userActionType.USER_GET_REJECTED_BIKES_FAIL:
      return {
        loading : false,
        rejectedBikesDataError : action.payload
      }
    
    default :
      return state
  }
}

export const userLocationReducer = (state={},action)=>{
  switch (action.type) {
    case userActionType.USER_GET_LOCATION_REQUEST:
      return {
        loading : true
      }
    case userActionType.USER_GET_LOCATION_SUCCESS:
      return {
        loading : false,
        locationData : action.payload
      }
    case userActionType.USER_GET_LOCATION_FAIL:
      return {
        loading : false,
        locationError : action.payload
      }
  
    default:
     return state
  }
}

export const userBookingBikeReducer =(state={},action)=>{
  switch (action.type) {
    case userActionType.USER_BOOKING_BIKE_REQUEST:
      return{
        bookingBikeLoading : true
      }
    case userActionType.USER_BOOKING_BIKE_SUCCESS:
      return{
        bookingBikeLoading : false,
        bookingBikeData : action.payload
      }
    case userActionType.USER_BOOKING_BIKE_FAIL:
      return {
        bookingBikeLoading: false,
        bookingBikeDataError : action.payload
      }
    case userActionType.USER_WALLET_BOOKING_SUCCESS:
      return {
        bookingBikeLoading : false,
        walletBookingSuccess : action.payload
      }
    default:
     return state
  }
}

export const userGetBookedBikeReducer =(state={},action)=>{
  switch(action.type){
    case userActionType.USER_GET_BOOKED_BIKE_REQUEST:
      return{
        getBookedBikeLoading : true
      }
    case userActionType.USER_GET_BOOKED_BIKE_SUCCESS:
      return{
        getBookedBikeLoading : false,
        bookedBikeData : action.payload
      }
    case userActionType.USER_GET_BOOKED_BIKE_FAIL:
      return{
        getBookedBikeLoading : false,
        bookedBikeDataError : action.payload
      }
    case userActionType.USER_CANCEL_BOOKED_BIKE_REQUEST:
      return{
        getBookedBikeLoading :true,
      }
    case userActionType.USER_CANCEL_BOOKED_BIKE_SUCCESS:
      return{
        getBookedBikeLoading : false,
        bookedBikeData :action.payload
      }
    case userActionType.USER_CANCEL_BOOKED_BIKE_FAIL:
      return{
        getBookedBikeLoading:false,
        bookedBikeDataError:action.payload
      }
    case userActionType.USER_END_BOOKED_BIKE_SUCCESS:
      return{
        getBookedBikeLoading:false,
        bookedBikeData : action.payload
      }
    default :
      return state
    
  }
}

// fine reducer

export const userPayFineReducer =(state={},action)=>{
  switch(action.type){
    case userActionType.USER_PAY_FINE_REQUEST:
      return {
        loading:true
      }
    case userActionType.USER_PAY_FINE_SUCCESS:
      return {
        loading:false,
        payFineData:action.payload
      }
    case userActionType.USER_PAY_FINE_FAIL:
      return {
        loading:false,
        payFineDataError:action.payload
      }
    default:
      return state
  }
}

// chat 

// contacts 

export const userGetContactReducer =(state={},action)=>{
  switch (action.type) {
    case userActionType.USER_GET_CONTACT_REQUEST:
      return{
        contactLoading : true
      }
    case userActionType.USER_GET_CONTACT_SUCCESS:
      return{
        contactLoading : false,
        contactData : action.payload
      }
    case userActionType.USER_GET_CONTACT_FAIL:
      return {
        contactLoading : false,
        contactDataError : action.payload
      }
  
    default:
      return state
  }
}

// coupons

export const userGetCouponReducer =(state={},action)=>{
  switch (action.type) {
    case userActionType.USER_GET_COUPON_REQUEST:
      return {
        couponLoading : true
      }
    case userActionType.USER_GET_COUPON_SUCCESS:
      return {
        couponLoading : false,
        couponData : action.payload
      }
    case userActionType.USER_GET_COUPON_FAIL:
      return {
        couponLoading : false,
        couponDataError : action.payload
      }
  
    default:
      return state;
  }
}

// wallet 

export const userGetWalletReducer =(state={},action)=>{
  switch(action.type){
    case userActionType.USER_GET_WALLET_REQUEST:
      return {
        walletLoading : true
      }
    case userActionType.USER_GET_WALLET_SUCCESS:
      return {
        walletLoading : false,
        walletData : action.payload
      }
    case userActionType.USER_GET_WALLET_FAIL:
      return {
        walletLoading : false,
        walletDataError : action.payload
      }
    default:
      return state
  }
}

export const getBrandsReducer =(state={},action)=>{
  switch (action.type) {
    case userActionType.GET_BRANDS_REQUEST:
      return{
        brandLoading:true
      }
    case userActionType.GET_BRANDS_SUCCESS:
      return{
        brandLoading:false,
        brands : action.payload
      }
    case userActionType.GET_BRANDS_FAIL:
      return{
        brandLoading:false,
        brandError : action.payload
      }
    default:
      return state;
  }
}