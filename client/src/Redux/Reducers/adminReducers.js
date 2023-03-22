import { adminActionType } from "../Constants/adminConstants"

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {

    case adminActionType.ADMIN_LOGIN_REQUEST:
      return {
        loading: true
      };

    case adminActionType.ADMIN_LOGIN_SUCCESS:
      return {
        loading: false,
        adminLoginData: action.payload
      };

    case adminActionType.ADMIN_LOGIN_FAIL:
      return {
        loading: false,
        adminLoginError: action.payload
      };

    case adminActionType.ADMIN_LOGOUT:
      return {
        adminLoginData: false
      }
    default:
      return state;
  }
}

export const adminUserFetchReducer = (state = {}, action) => {
  switch (action.type) {

    case adminActionType.ADMIN_USER_FETCH_REQUEST:
      return {
        loading: true
      }

    case adminActionType.ADMIN_USER_FETCH_SUCCESS:
      return {
        loading: false,
        adminUserData: action.payload
      }

    case adminActionType.ADMIN_USER_FETCH_FAIL:
      return {
        loading: false,
        adminUserDataError: action.payload
      }

    default:
      return state
  }
}

// export const adminUserBlockReducer = (state = {}, action) => {
//   console.log(action, 'action in block reducer');
//   switch (action.type) {
//     case ADMIN_USER_BLOCK_REQUEST:
//       return { blockLoading: true }
//     case ADMIN_USER_BLOCK_SUCCESS:
//       return { blockLoading: false, blockUserData: action.payload }
//     case ADMIN_USER_BLOCK_FAIL:
//       return { blockLoading: false, blockError: action.payload }

//     default:
//       return state;
//   }
// }