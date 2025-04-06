import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdAccountBox, MdMonochromePhotos } from "react-icons/md";
import { FaUserPlus } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";



function ProfileSidebar() {
  return (
    <section
     className='section'>
        <nav>
            <ul className="sidebar">
                <li >
                  <NavLink to="/" className="accountbox">
                  <MdAccountBox />
                    <h1>Album</h1>
                  </NavLink>
                </li>

               
            </ul>
        </nav>
         </section>
  )
}

export default ProfileSidebar