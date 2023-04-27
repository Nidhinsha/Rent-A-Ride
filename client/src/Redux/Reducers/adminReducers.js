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

export const adminGetAllBikeReducer = (state = {}, action) => {

  switch (action.type) {
    case adminActionType.ADMIN_GET_BIKE_REQUEST:
      return {
        bikeDataLoading: true
      }
    case adminActionType.ADMIN_GET_BIKE_SUCCESS:
      return {
        loading: false,
        bikeData: action.payload
      }
    case adminActionType.ADMIN_GET_BIKE_FAIL:
      return {
        loading: false,
        bikeDataError: action.payload
      }
    // in here im adding the bike into the existing state of the bike , by doing this i can reduce the req send to the backend

    case adminActionType.ADMIN_BIKE_ADD_SUCCESS:
      return {
        bikeData: [...state.bikeData, action.payload]
      }
    case adminActionType.ADMIN_DELETE_BIKE_REQUEST:
      return {
        bikeDeleteLoading: true
      }
    case adminActionType.ADMIN_DELETE_BIKE_SUCCESS:
      return {
        deleteLoading: false,
        bikeData: action.payload
      }
    case adminActionType.ADMIN_DELETE_BIKE_FAIL:
      return {
        deleteLoading: false,
        bikeDeleteError: action.payload
      }
    default:
      return state;
  }
}

export const adminRentRequestBikeReducer = (state = {}, action) => {
  switch (action.type) {
    case adminActionType.ADMIN_GET_PENDING_BIKE_REQUEST:
      return {
        loading: true
      }
    case adminActionType.ADMIN_GET_PENDING_BIKE_SUCCESS:
      return {
        loading: false,
        bikeRequestData: action.payload
      }
    case adminActionType.ADMIN_GET_PENDING_BIKE_FAIL:
      return {
        loading: false,
        bikeRequestDataError: action.payload
      }

    case adminActionType.ADMIN_ACCEPT_BIKE_REQUEST:
      return {
        loading: false
      }
    case adminActionType.ADMIN_ACCEPT_BIKE_SUCCESS:
      return {
        loading: false,
        bikeRequestData: action.payload
      }
    case adminActionType.ADMIN_ACCEPT_BIKE_FAIL:
      return {
        loading: false,
        bikeRequestDataError: action.payload
      }
    case adminActionType.ADMIN_REJECT_BIKE_REQUEST:
      return {
        loading: false
      }
    case adminActionType.ADMIN_REJECT_BIKE_SUCCESS:
      return {
        loading: false,
        bikeRequestData: action.payload
      }
    case adminActionType.ADMIN_REJECT_BIKE_FAIL:
      return {
        loading: false,
        bikeRequestDataError: action.payload
      }

    default: return state

  }
}

export const adminGetLocationReducer = (state = {}, action) => {

  
  switch (action.type) {
    case adminActionType.ADMIN_GET_LOCATION_REQUEST:
      return {
        loading: true
      }
    case adminActionType.ADMIN_GET_LOCATION_SUCCESS:
      return {
        loading: false,
        location:action.payload
      }
    case adminActionType.ADMIN_GET_LOCATION_FAIL:
      return {
        loading: false,
        locatonError: action.payload
      }
    default:
      return state
  }
}

export const adminEditLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case adminActionType.ADMIN_EDIT_LOCATION_REQUEST:
      return {
        editLocationLoading: true
      }
    case adminActionType.ADMIN_EDIT_LOCATION_SUCCESS:
      return {
        editLocationLoading: false,
        editLocationData: action.payload
      }
    case adminActionType.ADMIN_EDIT_LOCATION_FAIL:
      return {
        editLocationLoading: false,
        editLocationError: action.payload
      }
    default:
      return state
  }
}


export const adminDeleteLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case adminActionType.ADMIN_DELETE_LOCATION_REQUEST:
      return {
        locationLoading: true
      }
    case adminActionType.ADMIN_DELETE_LOCATION_SUCCESS:
      return {
        locationLoading: false,
        location: action.payload
      }
    case adminActionType.ADMIN_DELETE_LOCATION_FAIL:
      return {
        locationLoading: false,
        locationError: action.payload
      }
    default:
      return state
  }
}

export const adminCouponsReducer =(state={},action)=>{
  switch (action.type) {
    case adminActionType.ADMIN_GET_COUPON_REQUEST:
      return {
        loading : true
      }
    case adminActionType.ADMIN_GET_COUPON_SUCCESS:
      return {
        loading : false,
        couponData : action.payload
      }
    case adminActionType.ADMIN_GET_COUPON_FAIL:
      return {
        loading : false,
        couponDataError : action.payload
      }

    case adminActionType.ADMIN_ADD_COUPON_REQUEST:
      return {
        loading : true
      }
    case adminActionType.ADMIN_ADD_COUPON_SUCCESS:
      return {
        loading : false,
        couponData : action.payload
      }
    case adminActionType.ADMIN_ADD_COUPON_FAIL:
      return {
        loading : false,
        couponDataError : action.payload
      }

    case adminActionType.ADMIN_EDIT_COUPON_REQUEST:
      return {
        loading : true
      }
    case adminActionType.ADMIN_EDIT_COUPON_SUCCESS:
      return {
        loading : false,
        couponData : action.payload
      }
    case adminActionType.ADMIN_EDIT_COUPON_FAIL:
      return {
        loading : false,
        couponDataError : action.payload
      }

    case adminActionType.ADMIN_DELETE_COUPON_REQUEST:
      return {
        loading : true
      }
    case adminActionType.ADMIN_DELETE_COUPON_SUCCESS:
      return {
        loading : false,
        couponData : action.payload
      }
    case adminActionType.ADMIN_DELETE_COUPON_FAIL:
      return {
        loading : false,
        couponDataError : action.payload
      }
      
    default:
      return state;
  }
}

export const adminGetBookedBikeReducer =(state={},action)=>{
  switch(action.type){
    case adminActionType.ADMIN_GET_BOOKED_BIKE_REQUEST:
      return {
        loading : true
      }
    case adminActionType.ADMIN_GET_BOOKED_BIKE_SUCCESS:
      return {
        loading : false,
        bookedData : action.payload
      }
    case adminActionType.ADMIN_GET_BOOKED_BIKE_FAIL:
      return{
        loading : false,
        bookedDataError : action.payload
      }
    default :
      return state
  }
}

export const getDashboardInfoReducer =(state={},action)=>{
  switch (action.type) {
    case adminActionType.ADMIN_GET_DASHBOARD_INFO_REQUST:
      return{
        loading:true
      }
    case adminActionType.ADMIN_GET_DASHBOARD_INFO_SUCCESS:
      return{
        loading:false,
        dashboardData : action.payload
      }
    case adminActionType.ADMIN_GET_DASHBOARD_INFO_FAIL:
      return{
        loading:false,
        dashboardDataError : action.payload
      }
  
    default:
     return state;
  }
}

export const bikeReportDataReducer =(state={},action)=>{
  switch (action.type) {
    case adminActionType.BIKE_REPORT_DATA_REQUEST:
      return{
        loading:true
      }
    case adminActionType.BIKE_REPORT_DATA_SUCCESS:
      return{
        loading:false,
        reportData : action.payload
      }
    case adminActionType.BIKE_REPORT_DATA_FAIL:
      return{
        loading:false,
        reportDataError : action.payload
      }
  
    default:
      return state;
  }
}