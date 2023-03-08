import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
    userSignupReducer,
  } from "./Reducers/userReducers";

  const reducer = combineReducers({

    userSignup: userSignupReducer,
    
  });



let userinfo = JSON.parse(localStorage.getItem("userInfo"));

const initialstate = {
  userLogin: { userinfo: userinfo },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;