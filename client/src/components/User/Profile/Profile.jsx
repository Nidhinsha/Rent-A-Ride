import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Profile.css'
import { userProfile } from '../../../Redux/Actions/userActions'
import NavBar from '../NavBar/NavBar'

function Profile() {
    const dispatch = useDispatch()
    const userprofile = useSelector((state) => state.userProfile )

    const {loading , error,profileData} = userprofile
    

    useEffect(() => {
        dispatch(userProfile());
      },[dispatch]);
  return (
    <div>
      <NavBar />
      <div>
        {error ? <div>{error}</div>  : ""}
        {loading ? "loading.." : ""}
      {profileData 
        ? <div>
          <div>{profileData.firstName} {profileData.lastName}</div>   
          <div>{profileData.email}</div> 
          <div>{profileData.phone}</div> 
        </div>
        :""
      }
      </div>
    </div>
  )
}

export default Profile
