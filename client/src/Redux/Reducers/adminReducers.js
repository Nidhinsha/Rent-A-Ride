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

export const adminGetLocationReducer = (state={},action)=>{
  console.log('get loc redu ',action.payload)

  switch(action.type){
    case adminActionType.ADMIN_GET_LOCATION_REQUEST:
      return {
        loading : true
      }
    case adminActionType.ADMIN_GET_LOCATION_SUCCESS:
      return {
        loading : false,
        location : action.payload
      }
    case adminActionType.ADMIN_GET_LOCATION_FAIL:
      return {
        loading : false,
        locatonError : action.payload
      }
    default :
      return state
  }
}

export const adminEditLocationReducer = (state={},action)=>{
  switch(action.type){
    case adminActionType.ADMIN_EDIT_LOCATION_REQUEST:
      return {
        editLocationLoading : true
      }
    case adminActionType.ADMIN_EDIT_LOCATION_SUCCESS:
      return {
        editLocationLoading : false,
        editLocationData : action.payload
      }
    case adminActionType.ADMIN_EDIT_LOCATION_FAIL:
      return {
        editLocationLoading:false,
        editLocationError : action.payload
      }
    default :
      return state
  }
}


export const adminDeleteLocationReducer = (state = {},action)=>{
  switch(action.type){
    case adminActionType.ADMIN_DELETE_LOCATION_REQUEST:
      return {
        locationLoading : true
      }
    case adminActionType.ADMIN_DELETE_LOCATION_SUCCESS:
      return {
        locationLoading : false,
        location:action.payload
      }
    case adminActionType.ADMIN_DELETE_LOCATION_FAIL:
      return {
        locationLoading : false,
        locationError : action.payload
      }
    default :
      return state
  }
}