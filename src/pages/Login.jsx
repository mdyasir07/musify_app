import React, { useState } from 'react'
import "./style1.css"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { _Auth } from '../Backend/Firebase';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  let navigate = useNavigate()

  let [eye, seteye] = useState(false)
  let [data, setdata] = useState({
    user: "",
    pas: ""
  })
  function handlechnage(e) {

    let value = (e.target.value)
    let name = (e.target.name)
    setdata({ ...data, [name]: value })
  }
  async function handlesumbit(e) {

    e.preventDefault()

    try {
      
      let userername = await signInWithEmailAndPassword(_Auth, data.user, data.pas)
      console.log(userername)
      console.log(data)
      if (userername.user.emailVerified == true) {
        toast.success("email is verufied")
        navigate("/")
       
      

      }else{
        toast.error("email is not verifired")
      }
    

    }
    catch (err) {
      // toast.error(err.code)
      console.log(err)
    }


    // resetform()

  }



  // }
  // function resetform(e){
  //   setdata({
  //     user:"",

  //   pas:""


  //   })

  // }
  console.log(data)


  return (
    <>
      <div className='login'>
        <form action="" className='form-login ' >
          <label htmlFor="name" className='label-login' name="user">Email</label>
          <input type="text" placeholder='enter mail' id='name' className='input-login' name="user" onChange={handlechnage} />

          <br /><br />
          <label htmlFor="pas" className='label-login' name="pas"> Password</label>
          <input type={eye ? "text" : "password"} name='pas' placeholder='enter password' id='pas' className='input-login' onChange={handlechnage} />
          <span onClick={() => seteye(!eye)} className='eye'> {eye ? <FaEye /> : <FaEyeSlash />}</span>
          <div  className='forget'> 
            <span> Forget password?</span>
           
            <NavLink to="/reset"  className="reset"> reset password</NavLink>
          </div>
          <br/>
          
        



          <button className='log' style={{ cursor: 'pointer' }} onClick={handlesumbit} >
            Login
          </button>
          <h1 className='LOGIN'>    LOGIN PAGE
          </h1>


          <div className='create1'> 
          <span className='new'>  New to MusiFY?</span>
           
            <NavLink to="/register" className="click"> Register account</NavLink>
          </div>
          
        
        
        
        </form>
      </div>

    </>
  )
}

export default Login
