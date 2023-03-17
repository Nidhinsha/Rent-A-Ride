import React from 'react'
import  ReactDOM  from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import store from "./Redux/store"
import App from "./App"


import 'semantic-ui-css/semantic.min.css'

import 'bootstrap/dist/css/bootstrap.min.css';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";    


const element = document.getElementById("root")
const root = ReactDOM.createRoot(element)
root.render(
    <BrowserRouter>
    <Provider store={store}>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </Provider>
  </BrowserRouter>
)