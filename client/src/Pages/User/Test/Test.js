// import React, { useState } from "react";

function Test() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [addressLine1, setAddressLine1] = useState("");
  // const [addressLine2, setAddressLine2] = useState("");
  // const [postcode, setPostcode] = useState("");
  // const [state, setState] = useState("");
  // const [area, setArea] = useState("");
  // const [email, setEmail] = useState("");
  // const [education, setEducation] = useState("");
  // const [country, setCountry] = useState("");
  // const [stateRegion, setStateRegion] = useState("");
  // const [designExperience, setDesignExperience] = useState("");
  // const [additionalDetails, setAdditionalDetails] = useState("");
  // const [showExperienceForm, setShowExperienceForm] = useState(false);
  // const [experienceList, setExperienceList] = useState([]);

  // const handleSaveProfile = () => {
  //   // save profile information to database or server
  //   console.log("Profile information saved!");
  // };

  // const handleAddExperience = () => {
  //   setShowExperienceForm(true);
  // };

  // const handleExperienceFormSubmit = (event) => {
  //   event.preventDefault();
  //   const newExperience = {
  //     designExperience,
  //     additionalDetails,
  //   };
  //   setExperienceList([...experienceList, newExperience]);
  //   setDesignExperience("");
  //   setAdditionalDetails("");
  //   setShowExperienceForm(false);
  // };

  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Profile"
            />
            <span className="font-weight-bold">full name</span>
            <span className="text-black-50">email</span>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
              
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="surname"
                
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="surname"
                
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="surname"
                
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="surname"
                
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="surname"
                
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="surname"
                
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="surname"
                
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="surname"
                
                />
              </div>
              <div className="col-md-6">
                <label className="labels">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="surname"
                
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Test
