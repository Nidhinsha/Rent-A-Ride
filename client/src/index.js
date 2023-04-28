import React from 'react'
import  ReactDOM  from 'react-dom/client'

import { Provider } from "react-redux"
import store from "./Redux/store"
import App from "./App"
import './App.css'

import 'semantic-ui-css/semantic.min.css'

import 'bootstrap/dist/css/bootstrap.min.css';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";    
import ErrorBoundary from './components/ErrorBoundaryState/ErrorBoundaryState'


const element = document.getElementById("root")
const root = ReactDOM.createRoot(element)
root.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>

)