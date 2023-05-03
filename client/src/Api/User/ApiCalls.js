import axios from 'axios'

const API = axios.create({ baseURL: "https://rentaride.online/api/user" })

const config = {
  headers: {
    "Content-Type": "application/json",
  }
}
let user = JSON.parse(localStorage.getItem('userInfo'))

const ID = user?.id

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
export const homeBikeDataAPI =()=>API.get("/home-bikes",config)

export const userAddBikeAPI = (formdata) => API.post('/rent-bike?id=' + ID, formdata, configFormData)
export const userGetBikeAPI = (page) => API.get(`/bikes?id=${ID}&page=${page}`, config)
export const userGetAllRentedBikeAPI = () => API.get('/all-bikes?id=' + ID, configToken)
export const userGetAcceptedBikeAPI = () => API.get('/accepted-bikes?id=' + ID, configToken)
export const userGetRejectedBikeAPI = () => API.get('/rejected-bikes?id=' + ID, configToken)
export const userGetPendingBikeAPI = () => API.get('/pending-bikes?id=' + ID, configToken)
export const searchBikesAPI = (searchTerm,page) => API.post(`/search-bikes?page=${page}`, { searchTerm }, config)
export const userGetLocationAPI = () => API.get('/get-location', configToken)
export const userBookingBikeAPI = (bookingDetails) => API.post("/booking-bike", { bookingDetails }, configToken)

export const userCancelBookingAPI =(bikeId,bookingId,startTime,endTime,userId,price)=>
  API.get(`/cancel-booking?bikeId=${bikeId}&bookingId=${bookingId}&startTime=${startTime}&endTime=${endTime}&price=${price}&userId=${userId}`,configToken)
export const userEndBookingAPI =(bikeId,bookingId,startTime,endTime,userId,price)=>
  API.get(`/end-booking?bikeId=${bikeId}&bookingId=${bookingId}&startTime=${startTime}&endTime=${endTime}&price=${price}&userId=${userId}`,configToken)

export const userGetBookedBikeAPI = (id) => API.get("/booked-bikes?id=" + id, configToken)
// add finr option
export const userPayFineAPI =(fineData)=>API.post("/pay-fine?id="+ID,{fineData},configToken)
export const userFinePaymentSuccessAPI=(fineData)=>API.post("/userFine-payment-success",{fineData},configToken)
// coupon
export const userGetCouponAPI =()=>API.get("/user-coupons",configToken)
// wallet 
export const userGetWalletAPI =()=> API.get("/get-wallet?id="+ID,configToken)

// order
export const userCreateOrderAPI =(bookingDetails)=>API.post("/booking-success",{bookingDetails},configToken)
// chat
export const getAllUserContacts = (id) => API.get("/contacts?id=" + id, configToken)
export const sendMessageAPI = (data) => API.post("/add-message", { data }, configToken)
export const getAllMessagesAPI = (data) => API.post("/get-all-messages", { data }, configToken)
export const sendImageAPI =(data) =>API.post("/send-image",{data},configToken)

// filter
// brands
export const getBrandsAPI =()=>API.get("/brands",config)
export const getBikeWithBrandAPI =(brand,color,page)=>API.get(`/bike-with-brand?brand=${brand}&id=${ID}&color=${color}&page=${page}`,config)
