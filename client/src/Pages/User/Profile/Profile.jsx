import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext"
import { FileUpload } from 'primereact/fileupload';
import { InputMask } from "primereact/inputmask";
import Alert from '@mui/material/Alert';


import { useState } from "react";
// import "./Profile.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getUserProfileAction,
  userImageAction,
  userLogOut,
} from "../../../Redux/Actions/userActions";

import ErrorMessage from '../../../components/Alert/Error'
import Loading from '../../../components/Loading/Loading'
import { useNavigate } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import { TextField } from '@mui/material';

import ModalBox from '../../../components/Modal/ModalBox';

function Profile() {



  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [imgTypeError, setImgTypeError] = useState('')
  
  const [modal,setModal] = useState(false)

  const profileData = useSelector((state) => state.userLoginReducer.userLoginDetails);
  // const { loading, error, profileData } = profileData;
  // console.log('profiledata', profileData);
  console.log('profiledata ggggg', profileData);

  const profilePictureData = useSelector((state) => state.userImageUplaodReducer);
  const { imageLoading, imageError, profilePicture } = profilePictureData;
  const [photo, setPhoto] = useState("");
  console.log(profilePicture + "THIS IS THE IMAGE EEE");

  console.log(photo, 'phto name');

  const addphoto = (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log(photo, 'bbbbbbbbbbbbbb');
    data.append("file", photo);

    data.append("upload_preset", "RentAndRide");

    data.append("cloud_name", "driuxmoax");
    console.log(data);

  //   fetch("https://api.cloudinary.com/v1_1/driuxmoax/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       dispatch(userImageAction(data.url));
  //     });
  // };

  if (photo.type !== 'image/jpeg' && photo.type !== 'image/png') {
    setImgTypeError('Not Supported');
  } else {
    setImgTypeError('');
    fetch("https://api.cloudinary.com/v1_1/driuxmoax/image/upload", {
      method: "post",
      body: data,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dispatch(userImageAction(data.url));
    });
  }
};


  const handleLogOut = () => {
    dispatch(userLogOut())
    navigate("/login")
  }

  return (
    <>
      <NavBar />
      <div className="container rounded bg-white mb-5 ">
        {/* {error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : " "}
        {loading ? <Loading /> : ""} */}

        {/* modal box */}

        {
          modal ? <ModalBox closeModal={setModal} details={profileData}/> : ""
        }
       
        <div className="row">
     
          <div className="col-md-3 border-right">

            <div className="d-flex flex-column align-items-center text-center p-3 py-5 shadow p-3 mb-5 bg-white rounded">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={profileData?.photo
                  ? profileData?.photo
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
               
                alt="Profile" />
             
              <div className="col-md-12 mt-3">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText placeholder="Full Name" value={profileData?.firstName + profileData?.lastName} />
                </div>
              </div>
              <form>
              {imgTypeError && <Alert severity="error">{imgTypeError}</Alert>}

                <TextField size='md' type='file' className='mt-4' id='formFileLg' onChange={(e) =>setPhoto(e.target.files[0]) }
                />
                <div className="card flex flex-wrap justify-content-center gap-3 col-md-12 mt-3">
                  <Button
                    severity="primary"
                    label="Add Photo"
                    icon="pi pi-upload"
                    onClick={addphoto} />
                </div>
              </form>
             

              <div className="card flex flex-wrap justify-content-center gap-3 col-md-12 mt-5">
                <Button severity="primary" label="Reset Password" icon="pi pi-lock" />
              </div>
              <div className="card flex flex-wrap justify-content-center gap-3 col-md-12 mt-5">
                <Button severity="primary" label="LogOut" icon="pi pi-arrow-left" onClick={handleLogOut} />
              </div>
            </div>
          </div>

          <div className="col-md-8 border-right">

            <div className="p-3 py-5 shadow-lg p-3 mb-5 bg-white rounded">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>

              <div className="row mt-2">

                <div className="col-md-6">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="First Name" value={profileData?.firstName} />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Last Name" value={profileData?.lastName} />
                  </div>
                </div>

                <div className="col-md-12 mt-3">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-envelope"></i>
                    </span>
                    <InputText placeholder="Email" value={profileData?.email} />
                  </div>
                </div>

                <div className="col-md-12  mt-3">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-phone"></i>
                    </span>
                    <InputMask id="ssn" mask="999-999-9999" placeholder="999-999-9999" value={profileData?.phone}></InputMask>
                  </div>
                </div>

              </div>
              <div className="card flex flex-wrap justify-content-center gap-3  mt-3">
                <Button
                 severity="primary"
                  // label="Edit "
                   icon="pi pi-check"
                   onClick = {(e) => 
                    {setModal(true)}
                    } 
                    >Edit</Button>
              </div>
            </div>
            <div className="col-md-12 border-right">
              <div className="p-3 py-5 shadow-lg p-3 mb-5 bg-white rounded">
                <div className="col-md-12  ">
                  <label htmlFor="">Proof</label>
                  <div className="card">
                    {/* if the proof is there i a just need to show the proof otherse need to add it */}
                    <FileUpload 
                    severity="primary"
                     name="demo"
                      url={'/api/upload'}
                      
                       multiple accept="image/*"
                        maxFileSize={1000000}
                         emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* : ''} */}

      </div></>
  )
}
export default Profile
