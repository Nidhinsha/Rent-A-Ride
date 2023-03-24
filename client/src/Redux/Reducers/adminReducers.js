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

export const adminGetAllBikeReducer =(state={},action)=>{

  switch (action.type) {
    case adminActionType.ADMIN_GET_BIKE_REQUEST:
      return {
        bikeDataLoading : true
      }
    case adminActionType.ADMIN_GET_BIKE_SUCCESS:
      return {
        loading : false,
        bikeData : action.payload
      }
    case adminActionType.ADMIN_GET_BIKE_FAIL:
      return {
        loading : false,
        bikeDataError : action.payload
      }
    // in here im adding the bike into the existing state of the bike , by doing this i can reduce the req send to the backend

    case adminActionType.ADMIN_BIKE_ADD_SUCCESS:
      return {
        bikeData:[...state.bikeData,action.payload]
      }  
    default:
      return state;
  }
}
