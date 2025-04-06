import React from 'react'

import { Outlet } from 'react-router-dom'
import ProfileContent from './Profilecontent'
import ProfileSidebar from './Profilesidebar'
import "./style.css"
import Add from './Add'

function ProfileContainer() {
  return (
    <>
    <div  className='rahma'>
    <ProfileSidebar/>
    <ProfileContent/>

 
   
    
    
    </div>
    </>
  )
}

export default ProfileContainer