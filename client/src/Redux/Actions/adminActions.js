import { adminActionType } from '../Constants/adminConstants'
import { adminLoginApi, getAllBikeAPI, getUsersApi } from "../../Api/Admin/ApiCalls"


export const adminLogin = (email, password) => async (dispatch) => {

    dispatch({
        type : adminActionType.ADMIN_LOGIN_REQUEST
    })

    adminLoginApi(email,password).then((data) => {
        console.log("ADMINLOGINDATA",data);
        dispatch({
            type : adminActionType.ADMIN_LOGIN_SUCCESS,
            payload : data.data
        })

        localStorage.setItem("adminInfo",JSON.stringify(data.data))

        
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
            console.log('user api data',data.data);

            dispatch({
                type:adminActionType.ADMIN_USER_FETCH_SUCCESS,
                payload : data.data
            })
        })
        .catch((error)=>{
            console.log('api user error',error);

            dispatch({
                type:adminActionType.ADMIN_USER_FETCH_FAIL,
                payload : error.response.message
            })
        })
    } catch (error) {
        
    }
}


export const adminAddBikeAction = (data) => async(dispatch)=>{
    console.log(data,'data in the action of add bike ');

    dispatch({
        type : adminActionType.ADMIN_BIKE_ADD_SUCCESS,
        payload : data
    })
}


// GET THE ALL BIKE AND ALSO IN THIS ADDING THE NEW BIKES USING NEW TECHNIQUE

export const adminGetAllBikeAction = () =>async(dispatch)=>{
    console.log(dispatch,'gell bike');
    dispatch({
        type : adminActionType.ADMIN_GET_BIKE_REQUEST
    })

    getAllBikeAPI().then((data)=>{
        console.log(data.data,'data of the all bikes.');

        dispatch({
            type:adminActionType.ADMIN_GET_BIKE_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type: adminActionType.ADMIN_GET_BIKE_FAIL,
            payload : error.response.message
        })
    })
}