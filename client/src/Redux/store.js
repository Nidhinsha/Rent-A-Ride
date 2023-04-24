import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";


import {
  userSignupReducer,
  userLoginReducer,
  googleSignupReducer,
  userImageUplaodReducer,
  getUserProfileReduer,
  userGetBikeReducer,
  userProofUploadReducer,
  userGetAllRentedBikesReducer,
  userGetAcceptedBikeReducer,
  userGetPendingBikeReducer,
  userGetRejectedBikeReducer,
  userLocationReducer,
  userBookingBikeReducer,
  userGetBookedBikeReducer,
  userGetContactReducer,
  userGetCouponReducer,
  userGetWalletReducer,
  getBrandsReducer


} from "./Reducers/userReducers";

import {
  adminLoginReducer,
  adminUserFetchReducer,
  adminGetAllBikeReducer,
  adminGetLocationReducer,
  adminEditLocationReducer,
  adminDeleteLocationReducer,
  adminRentRequestBikeReducer,
  adminCouponsReducer,
  adminGetBookedBikeReducer


} from './Reducers/adminReducers'

const reducer = combineReducers({

  userSignupReducer: userSignupReducer,
  userLoginReducer: userLoginReducer,
  googleSignupReducer : googleSignupReducer,

  getUserProfileReduer: getUserProfileReduer,
  userImageUplaodReducer: userImageUplaodReducer,
  userProofUploadReducer:userProofUploadReducer,
  
  userGetBikeReducer: userGetBikeReducer,
  userGetAllRentedBikesReducer : userGetAllRentedBikesReducer,
  userGetAcceptedBikeReducer : userGetAcceptedBikeReducer,
  userGetPendingBikeReducer : userGetPendingBikeReducer,
  userGetRejectedBikeReducer : userGetRejectedBikeReducer,
  userLocationReducer : userLocationReducer,

  userGetWalletReducer :userGetWalletReducer,

  getBrandsReducer:getBrandsReducer,

  userBookingBikeReducer : userBookingBikeReducer,
  userGetBookedBikeReducer : userGetBookedBikeReducer,

  userGetContactReducer : userGetContactReducer,

  userGetCouponReducer : userGetCouponReducer,


  adminLoginReducer: adminLoginReducer,

  adminUserFetchReducer: adminUserFetchReducer,
  adminGetAllBikeReducer: adminGetAllBikeReducer,
  adminRentRequestBikeReducer:adminRentRequestBikeReducer,

  adminGetLocationReducer : adminGetLocationReducer,
  adminEditLocationReducer : adminEditLocationReducer,
  adminDeleteLocationReducer : adminDeleteLocationReducer,

  adminCouponsReducer :adminCouponsReducer,

  adminGetBookedBikeReducer : adminGetBookedBikeReducer
  
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