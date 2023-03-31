import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";


import {
  userSignupReducer,
  userLoginReducer,
  userImageUplaodReducer,
  getUserProfileReduer,
  userGetBikeReducer,
  userProofUploadReducer,
  userGetAllRentedBikesReducer,
  userGetAcceptedBikeReducer,
  userGetPendingBikeReducer,
  userGetRejectedBikeReducer


} from "./Reducers/userReducers";

import {
  adminLoginReducer,
  adminUserFetchReducer,
  adminGetAllBikeReducer,
  adminGetLocationReducer,
  adminEditLocationReducer,
  adminDeleteLocationReducer


} from './Reducers/adminReducers'

const reducer = combineReducers({

  userSignupReducer: userSignupReducer,
  userLoginReducer: userLoginReducer,

  getUserProfileReduer: getUserProfileReduer,
  userImageUplaodReducer: userImageUplaodReducer,
  userProofUploadReducer:userProofUploadReducer,
  
  userGetBikeReducer: userGetBikeReducer,
  userGetAllRentedBikesReducer : userGetAllRentedBikesReducer,
  userGetAcceptedBikeReducer : userGetAcceptedBikeReducer,
  userGetPendingBikeReducer : userGetPendingBikeReducer,
  userGetRejectedBikeReducer : userGetRejectedBikeReducer,



  adminLoginReducer: adminLoginReducer,

  adminUserFetchReducer: adminUserFetchReducer,
  adminGetAllBikeReducer: adminGetAllBikeReducer,

  adminGetLocationReducer : adminGetLocationReducer,
  adminEditLocationReducer : adminEditLocationReducer,
  adminDeleteLocationReducer : adminDeleteLocationReducer
  
});



let userInfo = JSON.parse(localStorage.getItem("userInfo"));
let adminInfo = JSON.parse(localStorage.getItem("adminInfo"))

const initialstate = {
  userLoginReducer: { userLoginDetails: userInfo },
  adminLoginReducer: { adminLoginData: adminInfo }
};



const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;