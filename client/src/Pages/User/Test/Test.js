// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { userGetBikeAction } from '../../../Redux/Actions/userActions'

// function Test() {

//   const dispatch = useDispatch()
//   const bikes = useSelector((state) => state.userGetBikeReducer)
//   const { bikesDataLoading, bikesData, bikesDataError } = bikes

//   useEffect(() => {
//     dispatch(userGetBikeAction())
// }, [])
//   return (
//     <>
//       <div>
//         {
//           bikesData ? bikesData.map((data,i)=>{
//             return(
//               <div key={i}>
//                 <p>{data.bikeName}</p>
//                 </div>
//             )
//           })
//           :""
//         }
//       </div>
//     </>
//   )
// }

// export default Test
