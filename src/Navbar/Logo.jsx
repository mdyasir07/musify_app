import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { myGarage } from '../authcontex/Authucontex';
import { doc, onSnapshot } from 'firebase/firestore';
import { _DB } from '../Backend/Firebase';

console.log("myGarage:", myGarage); // Add this before useContext

function Logo() {
  let { authuser, Logout } = useContext(myGarage);
  let uid=authuser?.uid
  
  console.log("Auth Context Value:", authuser); // Check if authuser is available
 
  let [profile, setProfile] = useState()

  useEffect(() => {


    function fetchdata() {
      if (authuser?.uid) {
        let user_profile_collection = doc(_DB, "user_profile", uid);
        onSnapshot(user_profile_collection, (userInfo) => {
          if (userInfo.exists()) {
            setProfile(userInfo.data());
          } else {
            console.log("userInfo not found");
            setProfile(null);
          }
        });
      } else {
        console.log("userId not found");
      }
    }
    fetchdata();
  }, [uid]);
  console.log(profile);


    function Buser(){
      return(
      <>
      {
        profile?.role == "admin" && <>
        <li>
          <NavLink to="/admin" className="yasirrr">
            <h1 className='yasirrr'>
              admin
            </h1>
          </NavLink>
        </li>
        </>
      }
      
        <NavLink to="/profile" className="text">
          
        <div className='yasir'>{authuser.displayName}
        </div>
          <img src={authuser.photoURL}/>

      
      
      </NavLink>
      
      <li>
        <button className='button' onClick={Logout}>

          Logout
        </button>
      </li>
      
      </>
      )

    }
    function Auser(){
      return(
      <>
      <li id='lists'> <NavLink to="/login" className="link"> Login</NavLink></li>
      <li id='listss'> <NavLink to="/register" className="link"> Register</NavLink></li>
       </>
      )

    }
    console.log(authuser)
    


 
  return (
    <>

      <ul className='menu'>
        <li id='list'> <NavLink to="/" className="link">Home</NavLink></li>
        
      </ul>
      {authuser?<Buser/>:<Auser/>}

    
    </>
  )
}

export default Logo