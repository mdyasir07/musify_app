import React, { createContext, useState } from "react";
import { _Auth } from "../Backend/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from 'react-hot-toast';

export let myGarage = createContext();

function Authcontex({ children }) {
  
  let [authuser, setAuthUser] = useState(null);

  async function Logout() {
    await signOut(_Auth);
    setAuthUser(null);
    toast.success("logged out succesfully");
  }

  onAuthStateChanged(_Auth, (userinfo) => {
    if (userinfo.emailVerified == true) setAuthUser(userinfo);
    else {
      setAuthUser(null);
    }
  });

  console.log("Auth Context Value Before Return:", authuser);
  
  return (
    <myGarage.Provider value={{ authuser, Logout }}>
      {children}
    </myGarage.Provider>
  );
}

export default Authcontex;