import React from 'react'
import "./style.css"
import { Outlet } from 'react-router-dom'
import Add from './Add'

function ProfileContent() {
  return (
  <section  >
    <div className='profile'>

         <Outlet/>
         
         
         </div>
         </section>
        
        
  
     
         
  )
}

export default ProfileContent