import axios from "axios"

const API = axios.create({baseURL : "http://localhost:5000/api/admin"})

const admin = JSON.parse(localStorage.getItem("adminInfo"))

console.log("admin data",admin);

const config = {
    headers :{
        "Content-Type" : "application/json"
    }
}

const configToken = {
    headers : {
        "Content-Type" : "application/json",
        Authorization :"Bearer"+' '+admin?.token
    }
}

export const adminLoginApi = (email,password) => API.post('/login',{email,password},config)
export const getUsersApi = () => API.get('/user-manage',configToken)
export const userBlockUnblockApi =(id) => API.get('/userBlockUnblock?id=' +id,configToken)
export const adminAddBikeAPI = (formData) => API.post('/add-bike',formData,configToken)