import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";


import {
    userSignupReducer,
    userLoginReducer,
    userProfileReducer

  } from "./Reducers/userReducers";

import {
  adminLoginReducer
} from './Reducers/adminReducers'

  const reducer = combineReducers({

    userSignup: userSignupReducer,
    userLogin : userLoginReducer,

    userProfile : userProfileReducer,

    adminLogin : adminLoginReducer
    
  });



let userData = JSON.parse(localStorage.getItem("userInfo"));

const initialstate = {
  userLogin: { userinfo: userData },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;