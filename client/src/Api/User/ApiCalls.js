import axios from 'axios'

const API = axios.create({baseURL: "http://localhost:5000/api/user"})

const config = {
    headers : {
      "Content-Type" : "application/json",
    }
}
let user = JSON.parse(localStorage.getItem('userInfo'))

const ID = user?.id

const configToken = {
  headers : {
   "Content-Type" : "application/json",
   Authorization:"Bearer"+' '+user?.token   
  }
}

const configFormData = {
  headers : {
    "Content-Type": "multipart/form-data",
    Authorization:"Bearer"+' '+user?.token   
  }
}
export const userSignUpAPI = (firstName,lastName,email,phone,password)=> API.post('/user-signup',{firstName,lastName,email,phone,password},config)
export const userLoginAPI = (email,password)=> API.post('/user-login',{email,password},config)
export const userHomeAPI = () => API.get('/',config)
export const userProfileAPI = (id) => API.get('/profile?id='+id,configToken)
export const userImageUploadAPI =(id,image) => API.post('/userProfileImageUpdate?id='+id,{image},configToken)
export const userAddBikeAPI = (formdata)=> API.post('/user-add-bike',formdata,configFormData)