
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