import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext"
import { InputMask } from "primereact/inputmask";
import Alert from '@mui/material/Alert';
import UploadIcon from '@mui/icons-material/Upload';

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  userImageAction,
  userLogOut,
  userProofAction,
} from "../../../Redux/Actions/userActions";

import { useNavigate } from 'react-router-dom';
import NavBar from '../../../components/NavBar/NavBar';
import { TextField } from '@mui/material';

import ModalBox from '../../../components/Modal/ModalBox';
import Footer from '../../../components/Home/Footer/Footer';
import WalletCard from '../../../components/Wallet/WalletCard';

function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [imgTypeError, setImgTypeError] = useState('')

  const [modal, setModal] = useState(false)

  const profileData = useSelector((state) => state.userLoginReducer.userLoginDetails);

  const [photo, setPhoto] = useState("");

  const addphoto = (e) => {

    e.preventDefault();
    const data = new FormData();
    data.append("file", photo);
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

    if (photo.type !== 'image/jpeg' && photo.type !== 'image/png') {
      setImgTypeError('Not Supported');
    } else {
      setImgTypeError('');
      fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(userImageAction(data.url));
        });
    }
  };

  // add proof
  const [proof, setProof] = useState("")
  const addProof = (e) => {
    e.preventDefault()

    const data = new FormData()

    data.append("file", proof)
    data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

    fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(userProofAction(data.url))
      })
  }
  const handleLogOut = () => {
    dispatch(userLogOut())
    navigate("/login")
  }

  return (
    <>
      <NavBar />
      <div className="container rounded bg-white mb-5" >
        {
          modal ? <ModalBox closeModal={setModal} details={profileData} /> : ""
        }

        <div className="row">

          <div className="col-md-3 border-right">

            <div className="d-flex flex-column align-items-center text-center p-3 py-5 shadow p-3 mb-5 bg-white rounded">
              <img
                className="rounded-circle mt-5"
                width="150px"
                height="150px"
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

                <TextField size='md' type='file' className='mt-4' id='formFileLg' onChange={(e) => setPhoto(e.target.files[0])}
                  inputProps={{
                    accept: '.jpg, .jpeg, .png'
                  }}
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

            {/* wallet */}
            <WalletCard />
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
                  // label="Edit"
                  icon="pi pi-user-edit"
                  onClick={(e) => { setModal(true) }
                  }
                  style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >Edit</Button>
              </div>
            </div>
            <div className="col-md-12 border-right">
              <div className="p-3 py-5 shadow-lg p-3 mb-5 bg-white rounded">
                <div className="col-md-12  ">
                  <label htmlFor="">Proof</label>


                  <div className="card" style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: "100%",
                    }}>
                      <TextField
                        sx={{
                          mb: 2,
                          width: "100%",
                          "& .MuiInputBase-input": {
                            color: "#4B5563",
                            fontSize: "14px",
                            fontWeight: "normal",
                          },
                        }}
                        required
                        id="outlined-required"
                        type='file'
                        inputProps={{
                          accept: '.jpg, .jpeg, .png'
                        }}

                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        onChange={(e) => setProof(e.target.files[0])}
                      />
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      width: "100%",
                    }}>
                      <Button
                        type='submit'
                        variant="contained"
                        size='small'
                        onClick={addProof}
                        sx={{
                          mb: 2,
                          backgroundColor: "#6366F1",
                          "&.MuiButtonBase-root:hover": {
                            bgcolor: "#4F46E5",
                          },
                          "& .MuiButton-label": {
                            color: "#FFFFFF",
                            fontSize: "14px",
                            fontWeight: "600",
                          },
                          mr: "16px",
                          borderRadius: "4px",
                          padding: "8px 16px",
                        }}
                      >
                        <UploadIcon style={{ marginRight: "8px" }} />
                        Upload
                      </Button>
                    </div>
                  </div>



                  <div className="card" style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                    {profileData?.proof ? (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
                        <div style={{ marginBottom: "10px" }}>
                          <strong>Proof Uploaded:</strong>
                        </div>
                        <img
                          src={profileData.proof}
                          alt="proof"
                          height="200px"
                          width="100%"
                          style={{ objectFit: "contain", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)" }}
                        />
                      </div>
                    ) : (
                      <div style={{ marginBottom: "10px" }}>
                        <strong>No Proof Uploaded</strong>
                      </div>
                    )}
                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <Footer />
    </>
  )
}
export default Profile
