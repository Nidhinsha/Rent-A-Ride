
import { userActionType } from "../Constants/userConstants";


export const userSignupReducer = (state ={}, action) => {
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
  console.log(action,'login reducer');
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
