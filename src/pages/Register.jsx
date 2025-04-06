
import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { _Auth } from '../Backend/Firebase';
import { createUserWithEmailAndPassword, sendEmailVerification,updateProfile } from 'firebase/auth';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
  let navigate=useNavigate()
  let [eye, seteye] = useState(false)
  let [eyee, seteyee] = useState(false)

  let [data, setdata] = useState({
    user: "",
    mail: "",
    pas: "",
    conpas: ""
  })

  function handlechnage(e) {
    let value = (e.target.value)
    let name = (e.target.name)
    setdata({ ...data, [name]: value })
  }
  // async function handlesumbit(e) {
  //   try {
  //     if (data.pas == data.conpas) {

  //       e.preventDefault()
  //       console.log(data)

  //       // resetform()


  //       let userdata = await createUserWithEmailAndPassword(_Auth, data.mail, data.pas)


  //       sendEmailVerification(userdata.user)
  //       console.log(userdata.user)
  //       toast.success("verification email has send to" + data.mail)
        
        
        
  //      await updateProfile(userdata.user,{
  //         displayName:rahma,
  //         photoURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRCNF19uRrBynAQMTG6A6Y3SFdUtEUbcbttw&s"

        
          
  //       })
  //       console.log(userdata.user)
        
  //       console.log("please work: ", userdata.user)

  //       navigate("/login")
  //     }

     
  //     else {
  //       toast.error("incorrect password")
  //     }
  //   }
  //   catch (err) {
  //     // toast.error("error" + err.code)
  //   }

  // }
  // function resetform(e){
  //   setdata({
  //     user:"",
  //   mail:"",
  //   pas:"",
  //   conpas:""

  //   })

  // }

  async function handlesumbit(e) {
    try {
      if (data.pas === data.conpas) {
        e.preventDefault();
        console.log(data);
  
        let userdata = await createUserWithEmailAndPassword(_Auth, data.mail, data.pas);
        sendEmailVerification(userdata.user);
        console.log(userdata.user);
        toast.success("Verification email has been sent to " + data.mail);
  
        // Update the profile
        await updateProfile(userdata.user, {
          displayName: data.user,  // You can replace this with 'data.user' to use the username input
          photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRCNF19uRrBynAQMTG6A6Y3SFdUtEUbcbttw&s",  // This can also be dynamic
        });
  
        // Reload to get updated user data
        await userdata.user.reload();  // This will refresh the user data from Firebase
  
        // Check if update was successful
        console.log("Updated User: ", userdata.user.displayName, userdata.user.photoURL);
  
        // After successful update, navigate
        navigate("/login");
      } else {
        toast.error("Passwords do not match.");
      }
    } catch (err) {
      console.error("Error during registration: ", err);
      toast.error("An error occurred. Please try again.");
    }
  }




  return (
    <>
      <div className='regsiter'>

        <form className='form' onSubmit={handlesumbit}>
          <label htmlFor="name" className='label' name="user">Username</label>
          <input type="text" placeholder='enter userername' id='name' className='input' name='user' onChange={handlechnage} value={data.user} />
          <br />
          <label htmlFor="mail " className='label' name=" mail">Email</label>
          <input type="email" placeholder='enter email' name='mail' id='mail' className='input' onChange={handlechnage} value={data.mail} />
          <br />
          <label htmlFor="pas" className='label' name="pas"> Password</label>
          <input type={eye ? "text" : "password"} name='pas' placeholder='enter password' id='pas' className='input' onChange={handlechnage} value={data.pas} />
          <span onClick={() => seteye(!eye)} className='eye'> {eye ? <FaEye /> : <FaEyeSlash />}</span>

          <label htmlFor="cp" className='label' name="conpas">Confirm Password</label>
          <input type={eyee ? "text" : "password"} name='conpas' placeholder='re-enter password' id='cp' className='input' onChange={handlechnage} value={data.conpas} />
          <span onClick={() => seteyee(!eyee)} className='eye'> {eyee ? <FaEye /> : <FaEyeSlash />} </span>
          
          <div className='account'> 
            <span >Already have an account</span>
            <NavLink to="/login" className="navlink">  Login</NavLink>
          </div>
          <br/>
          <button className='log' style={{ cursor: 'pointer' }} onClick={handlesumbit}>
            Register
          </button>
        </form>
        <h1 className='reg'>    REGISTER PAGE
        </h1>
      </div>

    </>
  )
}

export default Register
