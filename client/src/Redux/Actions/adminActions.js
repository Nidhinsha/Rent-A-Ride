import { adminActionType } from '../Constants/adminConstants'
import { acceptBikeAPI, addCouponAPI, addLocationAPI, adminDeleteBikeAPI, adminLoginApi, bikesReportAPI, deleteCouponAPI, deleteLocationAPI, editCouponAPI, editLocationAPI, getAllBikeAPI, getBookedBikeAPI, getCouponsAPI, getDashboardInfoAPI, getLocationAPI, getPendingBikeAPI, getUsersApi, rejectBikeAPI } from "../../Api/Admin/ApiCalls"


export const adminLogin = (email, password) => async (dispatch) => {

    dispatch({
        type : adminActionType.ADMIN_LOGIN_REQUEST
    })

    adminLoginApi(email,password).then((data) => {
        
        dispatch({
            type : adminActionType.ADMIN_LOGIN_SUCCESS,
            payload : data.data
        })

        localStorage.setItem("adminInfo",JSON.stringify(data.data))
        setTimeout(function() {
            window.location.href = '/admin/dashboard';
          }, 500);

        
    })
    .catch((error) => {
        dispatch({
            type : adminActionType.ADMIN_LOGIN_FAIL,
            payload : error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data
        })
    })
}

export const adminLogOut = () => async(dispatch)=>{
    try {
        localStorage.removeItem("adminInfo")
        dispatch({
            type : adminActionType.ADMIN_LOGOUT
        })
    } catch (error) {
        
    }
}

export const adminUserFetchAction =() =>async(dispatch)=>{
    try {
        dispatch({
            type : adminActionType.ADMIN_USER_FETCH_REQUEST
        })

        getUsersApi().then((data)=>{
            dispatch({
                type:adminActionType.ADMIN_USER_FETCH_SUCCESS,
                payload : data.data
            })
        })
        .catch((error)=>{
            dispatch({
                type:adminActionType.ADMIN_USER_FETCH_FAIL,
                payload :error.response.data.message
            })
        })
    } catch (error) {
        
    }
}


export const adminAddBikeAction = (data) => async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_BIKE_ADD_SUCCESS,
        payload : data
    })
}

export const adminDeleteBikeAction =(id)=> async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_DELETE_BIKE_REQUEST
    })

    adminDeleteBikeAPI(id).then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_DELETE_BIKE_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_DELETE_BIKE_FAIL,
            payload :error.response.data.message
        })
    })
}


// GET THE ALL BIKE AND ALSO IN THIS ADDING THE NEW BIKES USING NEW TECHNIQUE

export const adminGetAllBikeAction = () =>async(dispatch)=>{
  
    dispatch({
        type : adminActionType.ADMIN_GET_BIKE_REQUEST
    })

    getAllBikeAPI().then((data)=>{
        dispatch({
            type:adminActionType.ADMIN_GET_BIKE_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type: adminActionType.ADMIN_GET_BIKE_FAIL,
            payload : error.response.data.message
        })
    })
}

// GETTING THE PENDING BIKE DATA 

export const adminGetPendingBikeAction =() => async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_GET_PENDING_BIKE_REQUEST
    })

    getPendingBikeAPI().then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_GET_PENDING_BIKE_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_GET_PENDING_BIKE_FAIL,
            payload : error.response.data.message
        })
    })
}

export const adminAcceptBikeAction =(id)=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_ACCEPT_BIKE_REQUEST
    })

    acceptBikeAPI(id).then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_ACCEPT_BIKE_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_ACCEPT_BIKE_FAIL,
            payload : error.response.data.message
        })
    })
}

export const adminRejectBikeAction =(id)=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_REJECT_BIKE_REQUEST
    })

    rejectBikeAPI(id).then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_REJECT_BIKE_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_REJECT_BIKE_FAIL,
            payload : error.response.data.message
        })
    })
}

// ADDING LOCATION 
export const adminAddLocationAction = (location)=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_ADD_LOCATION_REQUEST
    })

    addLocationAPI(location).then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_ADD_LOCATION_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
   
        dispatch({
            type : adminActionType.ADMIN_ADD_LOCATION_FAIL,
            payload : error.response.data.message
        })
    })
}

export const adminGetLocation = ()=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_GET_LOCATION_REQUEST
    })

    getLocationAPI().then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_GET_LOCATION_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_GET_LOCATION_FAIL,
            payload :error.response.data.message
        })
    })
}

export const adminEditLocation =(id,locationData)=> async(dispatch)=>{

    dispatch({
        type : adminActionType.ADMIN_EDIT_LOCATION_REQUEST
    })

    editLocationAPI(id,locationData).then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_DELETE_LOCATION_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_EDIT_LOCATION_FAIL,
            payload : error.response.data.message
        })
    })
}


export const adminDeleteLocation =(id)=> async(dispatch)=>{
    dispatch({
        type:adminActionType.ADMIN_DELETE_LOCATION_REQUEST
    })

    deleteLocationAPI(id).then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_ADD_LOCATION_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_DELETE_LOCATION_FAIL,
            payload :error.response.data.message
        })
    })
}

export const adminGetCouponsAction =()=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_GET_COUPON_REQUEST
    })

    getCouponsAPI().then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_GET_COUPON_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_GET_COUPON_FAIL,
            payload : error.response.data.message
        })
    })
}

export const adminAddCouponAction=(couponName,couponCode,couponPrice)=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_ADD_COUPON_REQUEST
    })

    addCouponAPI(couponName,couponCode,couponPrice).then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_ADD_COUPON_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_ADD_COUPON_FAIL,
            payload : error.response.data.message
        })
    })
}

export const adminEditCouponAction=(id,couponName,couponCode)=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_EDIT_COUPON_REQUEST
    })

    editCouponAPI(id,couponName,couponCode).then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_EDIT_COUPON_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_EDIT_COUPON_FAIL,
            payload :error.response.data.message
        })
    })
}

export const adminDeleteCouponAction=(id)=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_DELETE_COUPON_REQUEST
    })

    deleteCouponAPI(id).then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_DELETE_COUPON_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>[
        dispatch({
            type : adminActionType.ADMIN_DELETE_COUPON_FAIL,
            payload : error.response.data.message
        })
    ])
}

export const adminGetBookedBikeAction =()=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_GET_BOOKED_BIKE_REQUEST
    })

    getBookedBikeAPI().then((data)=>{
        dispatch({
            type : adminActionType.ADMIN_GET_BOOKED_BIKE_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_GET_BOOKED_BIKE_FAIL,
            payload : error.response.data.message
        })
    })
}

export const getDashboardInfoAction =()=>async(dispatch)=>{
    dispatch({
        type:adminActionType.ADMIN_GET_DASHBOARD_INFO_REQUST
    })

    getDashboardInfoAPI().then((data)=>{
        dispatch({
            type:adminActionType.ADMIN_GET_DASHBOARD_INFO_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type:adminActionType.ADMIN_GET_DASHBOARD_INFO_FAIL,
            payload : error.response.data.message
        })
    })
}

export const bikeReportDataAction =()=>async(dispatch)=>{
    dispatch({
        type : adminActionType.BIKE_REPORT_DATA_REQUEST
    })

    bikesReportAPI().then((data)=>{
        dispatch({
            type:adminActionType.BIKE_REPORT_DATA_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type:adminActionType.BIKE_REPORT_DATA_FAIL,
            payload : error.response.data.message
        })
    })
}