import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Profile.css'
import { userProfile } from '../../../Redux/Actions/userActions'

function Profile() {
    const dispatch = useDispatch()
    const userprofile = useSelector((state) => state.userProfile )

    const {loading , error,profileData} = userprofile
    

    useEffect(() => {
        dispatch(userProfile());
      },[]);
  return (
    <div>
      <div>
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
