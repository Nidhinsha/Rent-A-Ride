import { adminActionType } from '../Constants/adminConstants'
import { adminLoginApi, getUsersApi } from "../../Api/Admin/ApiCalls"


export const adminLogin = (email, password) => async (dispatch) => {

    dispatch({ type: adminActionType.ADMIN_LOGIN_REQUEST })

    adminLoginApi(email, password).then((data) => {
        console.log('admin data in action', data);

        dispatch({ type: adminActionType.ADMIN_LOGIN_SUCCESS, payload: data.data })

        localStorage.setItem("adminInfo", JSON.stringify(data.data))
    })
    .catch((error)=>{
        dispatch({
            type: adminActionType.ADMIN_LOGIN_FAIL,
            payload: error.response.message
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
}