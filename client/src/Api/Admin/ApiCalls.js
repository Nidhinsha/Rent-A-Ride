import axios from "axios"


const API = axios.create({baseURL : "http://localhost:5000/api/admin"})

const config = {
  headers : {
    "Content-Type" : "application/json",
  }
}
const admin = JSON.parse(localStorage.getItem("adminInfo"))
console.log(admin,'admin loggggggggggggggggg');
const configToken = {
  headers : {
    "Content-Type": "application/json",
    Authorization:"Bearer"+' '+admin?.token  

  }
}

const configFormData = {
  headers : {
    "Content-Type": "multipart/form-data",
    Authorization:"Bearer"+' '+admin?.token  

  }
}
export const adminLoginApi = (email,password) => API.post('/login',{email,password},config)
export const getUsersApi = () => API.get('/user-manage',configToken)
export const userBlockUnblockApi =(id) => API.get('/userBlockUnblock?id='+id,configToken)
export const adminAddBikeAPI = (formdata) => API.post("/add-bike",formdata,configFormData)
export const getAllBikeAPI = () => API.get('/view-bike',configToken)
