import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdAccountBox, MdMonochromePhotos } from "react-icons/md";
import { FaUserPlus } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import "./style.css"

function ProfileSidebar() {
  return (
    <section
     className='section'>
        <nav>
            <ul className="sidebar">
                <li >
                  <NavLink to="/profile" className="accountbox">
                  <MdAccountBox />
                    <h1>My Account</h1>
                  </NavLink>
                </li>

                <li>
                  <NavLink  to="ad" className="addprofile " >
                  <FaUserPlus />

                    <h1>Add Profile</h1>
                  </NavLink >
                </li>

                <li>
                  <NavLink className="chnagepassword">
                  <RiLockPasswordFill />
                    <h1>Change Password</h1>
                  </NavLink>
                </li>

                <li>
                  <NavLink className="upload" to="up">
                  <MdMonochromePhotos />

                    <h1>Upload Photo</h1>
                  </NavLink>
                </li>

                <li>
                  <NavLink className="setting">
                  <IoSettings />

                    <h1>Settings</h1>
                  </NavLink>
                </li>
            </ul>
        </nav>
         </section>
  )
}

export default ProfileSidebar