import React, { useState, useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { myGarage } from '../authcontex/Authucontex';
import { doc, setDoc } from 'firebase/firestore';
import { _DB } from '../Backend/Firebase';
import "./style.css";

function Add() {
  const { authuser } = useContext(myGarage);
  const { uid, email, photoURL, displayName } = authuser || {};

  const [data, setData] = useState({
    first: "",
    last: "",
    dob: "",
    age: "",
    gender: "",
    address: "",
    country: "",
    state: "",
    city: "",
    language: "",
    role:"user"
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log form data (for debugging)
    console.log(data);

    // Prepare the full profile data to save
    const profileData = {
      first: data.first,
      last: data.last,
      dob: data.dob,
      age: data.age,
      gender: data.gender,
      address: data.address,
      country: data.country,
      state: data.state,
      city: data.city,
      language: data.language,
      displayName,
      photoURL,
      email,
      uid,
      role:data.role
    };

    try {
      // Save the profile data to Firestore
      const profileRef = doc(_DB, "user_profile", uid);
      await setDoc(profileRef, profileData);
      console.log("Profile added successfully!");
    } catch (error) {
      console.error("Error adding profile: ", error);
    }
  };

  return (
    <div className="add">
      <form className="form-add" onSubmit={handleSubmit}>
        <div className="area-first">
          <span className='profile-add'>
            
          </span>
          <label htmlFor="first" className="label-add">First Name</label>
          <input
            type="text"
            id="first"
            className="input-add"
            name="first"
            onChange={handleChange}
            value={data.first}
            placeholder="Enter first name"
          />

          <label htmlFor="last" className="label-add">Last Name</label>
          <input
            type="text"
            id="last"
            className="input-add"
            name="last"
            onChange={handleChange}
            value={data.last}
            placeholder="Enter last name"
          />
        </div>

        <div className="area-first">
          <label htmlFor="dob" className="label-add">DOB</label>
          <input
            type="date"
            id="dob"
            className="input-add"
            name="dob"
            onChange={handleChange}
            value={data.dob}
            placeholder="Enter DOB"
          />

          <label htmlFor="age" className="label-add">Age</label>
          <input
            type="number"
            id="age"
            className="input-add"
            name="age"
            onChange={handleChange}
            value={data.age}
            placeholder="Enter age"
          />
        </div>

        <div className="area-first">
          <label className="label-add">Gender</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="Male"
            onChange={handleChange}
            checked={data.gender === "Male"}
          />
          Male
          <input
            type="radio"
            id="female"
            name="gender"
            value="Female"
            onChange={handleChange}
            checked={data.gender === "Female"}
          />
          Female
          <input
            type="radio"
            id="others"
            name="gender"
            value="Other"
            onChange={handleChange}
            checked={data.gender === "Other"}
          />
          Other
        </div>

        <div className="area-first">
          <label htmlFor="address" className="label-add">Address</label>
          <textarea
            id="address"
            className="input-add"
            name="address"
            onChange={handleChange}
            value={data.address}
            placeholder="Enter address"
            rows="5"
            cols="10"
          />
        </div>

        <div className="area-first">
          <label htmlFor="country" className="label-add">Country</label>
          <input
            type="text"
            id="country"
            className="input-add"
            name="country"
            onChange={handleChange}
            value={data.country}
            placeholder="Enter country"
          />

          <label htmlFor="state" className="label-add">State</label>
          <input
            type="text"
            id="state"
            className="input-add"
            name="state"
            onChange={handleChange}
            value={data.state}
            placeholder="Enter state"
          />
        </div>

        <div className="area-first">
          <label htmlFor="city" className="label-add">City</label>
          <input
            type="text"
            id="city"
            className="input-add"
            name="city"
            onChange={handleChange}
            value={data.city}
            placeholder="Enter city"
          />

          <label htmlFor="language" className="label-add">Language</label>
          <input
            type="text"
            id="language"
            className="input-add"
            name="language"
            onChange={handleChange}
            value={data.language}
            placeholder="Enter language"
          />
        </div>
        <br/>

        <button type="submit" className="add-log" style={{ cursor: 'pointer' }}>
          Add Profile
        </button>
      </form>
    </div>
  );
}

export default Add;