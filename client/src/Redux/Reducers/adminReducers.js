import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,

  ADMIN_USER_FETCH_REQUEST,
  ADMIN_USER_FETCH_SUCCESS,
  ADMIN_USER_FETCH_FAIL,

  ADMIN_USER_BLOCK_REQUEST,
  ADMIN_USER_BLOCK_SUCCESS,
  ADMIN_USER_BLOCK_FAIL

} from '../Constants/adminConstants'

const initialState = {}

export const adminLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGOUT:
      return {}
    default:
      return state;
  }
}

export const adminUserFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_USER_FETCH_REQUEST:
      return { loading: true }
    case ADMIN_USER_FETCH_SUCCESS:
      return { loading: false, adminUserData: action.payload }
    case ADMIN_USER_FETCH_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adminUserBlockReducer = (state= {},action)=>{
  console.log(action,'action in block reducer');
  switch (action.type) {
    case ADMIN_USER_BLOCK_REQUEST:
      return {blockLoading : true}
    case ADMIN_USER_BLOCK_SUCCESS:
      return {blockLoading : false, blockUserData : action.payload}
    case ADMIN_USER_BLOCK_FAIL:
      return {blockLoading : false , blockError : action.payload}
  
    default:
      return state;
  }
}