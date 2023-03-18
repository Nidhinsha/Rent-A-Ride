// import React from 'react'
// import './Adminhome.css'
// import {useNavigate} from 'react-router-dom'
// import {useDispatch,useSelector} from 'react-redux'
// import {Table,Button, Container, Form} from 'react-bootstrap'
// import { useEffect } from 'react'
// import { adminHomeAction, adminuserBlock,admindeleteUser, adminLogout, adminSearch } from '../../../REDUX/Actions/adminAction'
// import { useState } from 'react'

// function Test() {
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   const [searchkeyword,setSearchKeyword] = useState('')
//   // const adminsearch = useSelector((state)=>state.adminSearch)
//   // let {searchloading,searcherror,searchresult} = adminsearch
//   // console.log(searchresult);
//   const adminhome = useSelector((state)=>state.adminHome)
//   let {loading,error,adminHome} = adminhome;
//   const adminblock = useSelector((state)=>state.adminBlock)
//   let {blockloading,blockerror,blockdata} = adminblock;
//   // const admindelete = useSelector((state)=>state.adminDelete)
//   // let {deleteloading,deleteerror,deletedata} = admindelete
//   useEffect(()=>{
//     let admindata = localStorage.getItem("adminInfo")
//     if(admindata!=null){
//       dispatch(adminHomeAction())
//     }else{
//       navigate("/admin/login")
//     }

    

//   },[blockdata])

//   const blockuser = (id)=>{
//     dispatch(adminuserBlock(id))
//   }

 
//   const logout = ()=>{
//     dispatch(adminLogout())
//     navigate("/admin/login")
//   }

 
 
//   console.log(blockloading);
//   return (
    
//     <div className='adminhomemain'>
//       <h2>ADMIN HOME </h2>
//       <Button className='btn btn-warning' style={{right:0}} onClick={logout}> <i class="fa-solid fa-power-off"></i> LOGOUT</Button>
//       <Container>
       
      
        
//        {
//         adminHome?   <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Name</th>
//             <th>Last Name</th>
//             <th>ACCESS</th>
//             <th>Delete</th>
//           </tr>
//         </thead>
//         <tbody>
//         {
//          adminHome?adminHome.map((data,i)=>{
//           return(
   
//         <tr>
//           <td>{i+1}</td>
//           <td>{data.firstname} {data.lastname}</td>
//           <td>{data.email}</td>
//           <td> {blockloading ? <p>Loading</p> : <Button onClick={()=>blockuser(data._id)} style={data.status?{backgroundColor:"red",width:"100px"}:{backgroundColor:"green",width:"100px"}}> {data.status ? 'Block' : 'Unblock'} </Button> } </td>
//           {/* <td><Button onClick={()=>deleteuser(data._id)} style={{backgroundColor:"red"} }>Delete</Button></td> */}
//         </tr>
       
      
  
//           )
//         }) : ''
//         }
//         </tbody>
//       </Table> : ''
//        }
//       </Container>
//     </div>
//   )
// }

// export default Test