import {
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAIL,

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL

} from '../Constants/userConstants'

const initialState = {}

export const userSignupReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:

            return { loading: true }

        case USER_SIGNUP_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}


export const userLoginReducer = (state = initialState , action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading : true}
        case USER_LOGIN_SUCCESS:
            return { loading : false, userInfo : action.payload}
        case USER_LOGIN_FAIL:
            return { loading : false , error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userProfileReducer = (state = initialState,action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {loading : true}

        case USER_PROFILE_SUCCESS:
            return {loading : false , profileData : action.payload}

        case USER_PROFILE_FAIL:
            return {loading : false , error : action.payload}
            
        default:
            return state
    }
}