import { adminActionType } from '../Constants/adminConstants'
import { addLocationAPI, adminDeleteBikeAPI, adminLoginApi, deleteLocationAPI, editLocationAPI, getAllBikeAPI, getLocationAPI, getUsersApi } from "../../Api/Admin/ApiCalls"


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
                payload : error.response.message
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
            payload : error.response.message
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
    
        dispatch({
            type : adminActionType.ADMIN_ADD_LOCATION_SUCCESS,
            payload : data.data
        })
    })
    .catch((error)=>{
   
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
            payload : error.response.message
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
            payload :error.response.message
        })
    })
}