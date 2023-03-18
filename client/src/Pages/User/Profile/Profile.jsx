import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from 'primereact/fileupload';
import { InputMask } from "primereact/inputmask";
import { Toast } from 'primereact/toast';


import { FileInput, rem } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

import { useState } from "react";
// import "./Profile.css";
import { MDBFile } from 'mdb-react-ui-kit';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import {
  userImageAction,
  userProfileAction,
} from "../../../Redux/Actions/userActions";
import ErrorMessage from '../../../components/Alert/Error'
import Loading from '../../../components/Loading/Loading'
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../../Redux/Actions/userActions';
import NavBar from '../../../components/NavBar/NavBar';

function Profile() {



  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userProfileData = useSelector((state) => state.userProfile);
  const { loading, error, profileData } = userProfileData;
  console.log('profiledata', profileData);

  const image = useSelector((state) => state.userImage);
  const { imageloading, imageerror, userProfilePicture } = image;
  const [photo, setPhoto] = useState("");
  console.log(userProfilePicture + "THIS IS THE IMAGE EEE");

  console.log(photo, 'phto name');

  const addphoto = (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log(photo, 'bbbbbbbbbbbbbb');
    data.append("file", photo);
    // data.append("upload_preset", "noteapp");
    data.append("upload_preset", "RentAndRide");
    // data.append("cloud_name", "dhajqatgt");driuxmoax,thy3sk1o
    data.append("cloud_name", "driuxmoax");
    console.log(data);

    fetch("https://api.cloudinary.com/v1_1/driuxmoax/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(userImageAction(data.url));
      });
  };

  useEffect(() => {
    dispatch(userProfileAction());
  }, [userProfilePicture]);

  console.log(userProfilePicture + "THIS IS THE IMAGEEEE");

  const handleLogOut = () => {
    dispatch(userLogout())
    navigate("/login")
  }

  return (
    <>
    <NavBar />
    <div className="container rounded bg-white mb-5 ">
      {error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : " "}
      {loading ? <Loading /> : ""}
      {/* {profileData ? */}
        <div className="row">
          {/* <h1>{profileData.firstName}</h1> */}
          <div className="col-md-3 border-right">

            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={profileData?.photo
                  ? profileData?.photo
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                // src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                alt="Profile" />
              {/* <span className="font-weight-bold">full name</span> */}
              <div className="col-md-12 mt-3">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText placeholder="Full Name" value={profileData?.firstName + profileData?.lastName} />
                </div>
              </div>

              <form>

                <MDBFile size='md' className='mt-4' id='formFileLg' onChange={(e) => setPhoto(e.target.files[0])} />
                <div className="card flex flex-wrap justify-content-center gap-3 col-md-12 mt-3">
                  <Button
                    label="Add Photo"
                    icon="pi pi-upload"
                    onClick={addphoto} />
                </div>
              </form>

              <div className="card flex flex-wrap justify-content-center gap-3 col-md-12 mt-5">
                <Button label="LogOut" icon="pi pi-arrow-left" onClick={handleLogOut} />
              </div>
            </div>
          </div>

          <div className="col-md-8 border-right">

            <div className="p-3 py-5">
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

                <div className="col-md-12  mt-3">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-home"></i>
                    </span>
                    <InputTextarea placeholder="Address" />
                  </div>
                </div>


                <div className="col-md-12  mt-3">
                  <label htmlFor="">Proof</label>
                  <div className="card">
                    <FileUpload severity="primary" name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                  </div>
                </div>


                <div className="col-md-6  mt-3">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-globe"></i>
                    </span>
                    <InputText placeholder="Country" />
                  </div>
                </div>

                <div className="col-md-6  mt-3">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-map"></i>
                    </span>
                    <InputText placeholder="State" />
                  </div>
                </div>

                <div className="col-md-6  mt-3">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-building"></i>
                    </span>
                    <InputText placeholder="Landmark" />
                  </div>
                </div>

                <div className="col-md-6  mt-3">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <i className="pi pi-map-marker"></i>
                    </span>
                    <InputText placeholder="Pincode" />
                  </div>
                </div>




              </div>
              <div className="card flex flex-wrap justify-content-center gap-3  mt-3">
                <Button label="Save " icon="pi pi-check" />
              </div>
            </div>
          </div>
        </div>




        {/* : ''} */}

    </div></> 
  )
}
export default Profile
