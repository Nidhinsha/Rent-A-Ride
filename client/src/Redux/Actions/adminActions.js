import { adminActionType } from '../Constants/adminConstants'
import { addLocationAPI, adminLoginApi, deleteLocationAPI, editLocationAPI, getAllBikeAPI, getLocationAPI, getUsersApi } from "../../Api/Admin/ApiCalls"


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

// ADDING LOCATION 
export const adminAddLocationAction = (location)=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_ADD_LOCATION_REQUEST
    })

    addLocationAPI(location).then((data)=>{
        console.log(data.data,'data added back and send to front');
        dispatch({
            type : adminActionType.ADMIN_ADD_LOCATION_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        console.log('err in the add loc F',error);
        dispatch({
            type : adminActionType.ADMIN_ADD_LOCATION_FAIL,
            payload : error.response.message
        })
    })
}

export const adminGetLocation = ()=>async(dispatch)=>{
    dispatch({
        type : adminActionType.ADMIN_GET_LOCATION_REQUEST
    })

    getLocationAPI().then((data)=>{
        console.log('data of loc get',data.data);

        dispatch({
            type : adminActionType.ADMIN_GET_LOCATION_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_GET_LOCATION_FAIL,
            payload : error.response.message
        })
    })
}

export const adminEditLocation =(id,locationData)=> async(dispatch)=>{
    console.log(id,locationData,'id for edit loc');

    dispatch({
        type : adminActionType.ADMIN_EDIT_LOCATION_REQUEST
    })

    editLocationAPI(id,locationData).then((data)=>{
        console.log(data.data,'edit data resp');

        dispatch({
            type : adminActionType.ADMIN_DELETE_LOCATION_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
        dispatch({
            type : adminActionType.ADMIN_EDIT_LOCATION_FAIL,
            payload : error.response.message
        })
    })
}


export const adminDeleteLocation =(id)=> async(dispatch)=>{
    console.log('delete id',id);

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
            payload :error.response.message
        })
    })
}