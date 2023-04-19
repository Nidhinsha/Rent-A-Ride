import axios from 'axios'

const API = axios.create({ baseURL: "http://localhost:5000/api/user" })

const config = {
  headers: {
    "Content-Type": "application/json",
  }
}
let user = JSON.parse(localStorage.getItem('userInfo'))

const ID = user?.id
console.log(ID, 'userid');

export const configToken = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer" + ' ' + user?.token
  }
}

const configFormData = {
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: "Bearer" + ' ' + user?.token
  }
}
export const userSignUpAPI = (firstName, lastName, email, phone, password,referalCode) => API.post('/user-signup', { firstName, lastName, email, phone, password,referalCode }, config)
export const userLoginAPI = (email, password) => API.post('/user-login', { email, password }, config)
export const userOtpLoginAPI = (phone) => API.post('/otp-login', { phone }, config)
export const googleSignupAPI = (firstName, lastName, email, phone, photo) => API.post('/google-signup', { firstName, lastName, email, phone, photo }, config)
export const userHomeAPI = () => API.get('/', config)
export const userProfileAPI = (id) => API.get('/profile?id=' + id, configToken)
export const userImageUploadAPI = (id, image) => API.post('/userProfileImageUpdate?id=' + id, { image }, configToken)
export const userProofUploadAPI = (id, image) => API.post('/userAddProof?id=' + id, { image }, configToken)
export const userEditProfileAPI = (firstName, lastName, email, phone, id) => {
  return (
    API.post('/edit-profile?id=' + ID, { firstName, lastName, email, phone }, configToken)
  )
}
export const userAddBikeAPI = (formdata) => API.post('/rent-bike?id=' + ID, formdata, configFormData)
export const userGetBikeAPI = () => API.get('/bikes', config)
export const userGetAllRentedBikeAPI = () => API.get('/all-bikes?id=' + ID, configToken)
export const userGetAcceptedBikeAPI = () => API.get('/accepted-bikes?id=' + ID, configToken)
export const userGetRejectedBikeAPI = () => API.get('/rejected-bikes?id=' + ID, configToken)
export const userGetPendingBikeAPI = () => API.get('/pending-bikes?id=' + ID, configToken)
export const searchBikesAPI = (searchTerm) => API.post('/search-bikes', { searchTerm }, config)
export const userGetLocationAPI = () => API.get('/get-location', config)
export const userBookingBikeAPI = (bookingDetails) => API.post("/booking-bike", { bookingDetails }, configToken)

export const userGetBookedBikeAPI = (id) => API.get("/booked-bikes?id=" + id, configToken)

// coupon
export const userGetCouponAPI =()=>API.get("/user-coupons",configToken)
// wallet 
export const userGetWalletAPI =(id)=> API.get("/get-wallet",configToken)

// order
export const userCreateOrderAPI =(bookingDetails)=>API.post("/booking-success",{bookingDetails},configToken)
// chat
export const getAllUserContacts = (id) => API.get("/contacts?id=" + id, configToken)
export const sendMessageAPI = (data) => API.post("/add-message", { data }, configToken)
export const getAllMessagesAPI = (data) => API.post("/get-all-messages", { data }, configToken)
