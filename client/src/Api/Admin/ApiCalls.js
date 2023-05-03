import axios from "axios"

const API = axios.create({baseURL : "https://rentaride.online/api/admin"})

const config = {
  headers : {
    "Content-Type" : "application/json",
  }
}

const admin = JSON.parse(localStorage.getItem("adminInfo"))

const configToken = {
  headers : {
    "Content-Type": "application/json",
    Authorization:"Bearer"+' '+admin?.token,
  }
}


const configFormData = {
  headers : {
    "Content-Type": "multipart/form-data",
    authorization:"Bearer"+' '+admin?.token  
  }
}
export const adminLoginApi = (email,password) => API.post('/login',{email,password},config)
export const getUsersApi = () => API.get('/user-manage',configToken)
export const userBlockUnblockApi =(id) => API.get('/userBlockUnblock?id='+id,configToken)
export const adminAddBikeAPI = (formdata) => API.post("/add-bike",formdata,configFormData)
export const adminEditBikeAPI = (id,formData) => API.post("/edit-bike?id="+id,formData,configFormData)
export const adminDeleteBikeAPI = (id) => API.delete('/delete-bike?id='+id,configToken)
export const getAllBikeAPI = () => API.get('/view-bike',configToken)
export const getPendingBikeAPI = () => API.get('/user-rent-request',configToken)
// evert time we use put or post make sure to use data part req,data,header
export const acceptBikeAPI =(id)=> API.put('/accept-request?id='+id,{},configToken)
export const rejectBikeAPI =(id)=>API.put('/reject-request?id='+id,{},configToken)

export const addLocationAPI = (location)=> API.post('/add-location',{location},configToken)
export const getLocationAPI = ()=> API.get('/locations',configToken)
export const editLocationAPI = (id,location)=>API.put('/edit-location?id='+id,{location},configToken)
export const deleteLocationAPI =(id)=> API.delete('/delete-location?id='+id,configToken)

export const addCouponAPI =(couponName,couponCode,couponPrice)=> API.post("/add-coupon",{couponName,couponCode,couponPrice},configToken)
export const getCouponsAPI =()=>API.get("/coupons",configToken)
export const editCouponAPI =(id,couponName,couponCode)=>API.put("/edit-coupon?id="+id,{couponName,couponCode},configToken)
export const deleteCouponAPI =(id)=>API.delete("/delete-coupon?id="+id,configToken)

export const getBookedBikeAPI =()=>API.get("/view-booked-bike",configToken)

export const getDashboardInfoAPI =()=>API.get("/get-dashboard-info",configToken)

export const bikesReportAPI =()=>API.get("/bikes-report",configToken)