// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import './Profile.css'
// import { userProfile } from '../../../Redux/Actions/userActions'
// import NavBar from '../NavBar/NavBar'

// function Profile() {
//     const dispatch = useDispatch()
//     const userprofile = useSelector((state) => state.userProfile )

//     const {loading , error,profileData} = userprofile
    

//     useEffect(() => {
//         dispatch(userProfile());
//       },[dispatch]);
//   return (
//     <div>
//       <NavBar />
//       <div>
//         {error ? <div>{error}</div>  : ""}
//         {loading ? "loading.." : ""}
//       {profileData 
//         ? <div>
//           <div>{profileData.firstName} {profileData.lastName}</div>   
//           <div>{profileData.email}</div> 
//           <div>{profileData.phone}</div> 
//         </div>
//         :""
//       }
//       </div>
//     </div>
//   )
// }

// export default Profile


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';
import { userProfile, updateUserProfile } from '../../../Redux/Actions/userActions';
import NavBar from '../NavBar/NavBar';

function Profile() {
  const dispatch = useDispatch();
  const userprofile = useSelector((state) => state.userProfile);

  const { loading, error, profileData } = userprofile;

  const [firstName, setFirstName] = useState(profileData?.firstName || '');
  const [lastName, setLastName] = useState(profileData?.lastName || '');
  const [email, setEmail] = useState(profileData?.email || '');
  const [phone, setPhone] = useState(profileData?.phone || '');
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    if (picture) {
      formData.append('picture', picture);
    }
    dispatch(updateUserProfile(formData));
  };

  return (
    <div>
      <NavBar />
      <div>
        {error ? <div>{error}</div> : ''}
        {loading ? 'loading...' : ''}
        {profileData ? (
          <div>
            <div>{profileData.firstName} {profileData.lastName}</div>
            <div>{profileData.email}</div>
            <div>{profileData.phone}</div>
            <div>
              <img src={profileData.pictureUrl} alt="Profile" />
            </div>
            <form onSubmit={handleFormSubmit}>
              <label>
                First Name:
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </label>
              <br />
              <label>
                Last Name:
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </label>
              <br />
              <label>
                Email:
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <br />
              <label>
                Phone:
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </label>
              <br />
              <label>
                Profile Picture:
                <input type="file" accept="image/*" onChange={handlePictureChange} />
              </label>
              <br />
              <button type="submit">Save Changes</button>
            </form>
          </div>
        ) : ''}
      </div>
    </div>
  );
}

export default Profile;

