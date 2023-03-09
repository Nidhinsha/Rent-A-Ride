import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
    userSignupReducer,
    userLoginReducer
  } from "./Reducers/userReducers";

  const reducer = combineReducers({

    userSignup: userSignupReducer,
    userLogin : userLoginReducer
    
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