import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import { _Auth } from '../Backend/Firebase'

function Reset() {
    let [email,setemail]=useState("")
    function handlechnage(e) {

        
        setemail(e.target.value )
      }
      async function handlesumbit(e) {
    
        e.preventDefault()
        try{
             await sendPasswordResetEmail(_Auth , email)
              toast.success(`reset mail send to ${email} suxessfully`)
  
        }
        catch(err){
            // toast.error(err.code)
            console.log(err)
        }
       }
       console.log(email)
  return (
    <>
      <div className='reset-page' >
      <form action="" className='form-reset ' >
          <label htmlFor="name" className='label-add' name="user">Email</label>
          <input type="text" placeholder='enter mail' id='name' className='input-add' name="user" onChange={handlechnage}  value={email}/>
          

          <br /><br />
         
          



          <button className='log' style={{ cursor: 'pointer' }}  onClick={handlesumbit} >
            Login
          </button>
          <h1 className='password'>   RESET PASSWORD
          </h1>


          <div className='create'> 
     
           
            <NavLink to="/login" className="back"> back to login</NavLink>
          </div>
          
        
        
        
        </form>
         </div>
    </>
  )
}

export default Reset
