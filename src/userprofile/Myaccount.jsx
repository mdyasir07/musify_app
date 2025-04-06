import React, { useContext, useEffect, useState } from 'react'
import { myGarage } from '../authcontex/Authucontex'
import { FaUserXmark } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { _DB } from '../Backend/Firebase';



function Myaccount() {
  
    let{authuser}=useContext(myGarage)|| ""
    let {uid,displayName,photoURL,email}= authuser || ""
    let[photo,setphoto]=useState("")
    let[profile,setprofile]=useState("")
    let[username,setusername]=useState("")
    let[useremail,setuseremail]=useState("")
    let[first,setfirst]=useState("")
    let[last,setlast]=useState("")
    let[dob,setdob]=useState("")
    let[age,setage]=useState("")
    let[gender,setgender]=useState("")
    let[address,setaddress]=useState("")
    let[country,setcountry]=useState("")
    let[state,setstate]=useState("")
    let[language,setlanguage]=useState("")


    console.log( "blah",authuser)

    function fetchdata(){
        if(uid){
            let Profile=doc(_DB,"user_profile",authuser?.uid)
            onSnapshot(Profile,(userinfo)=>{
                if(userinfo.exists()){
                    let usetdata=userinfo.data()
                   
                    setprofile(usetdata)
                setphoto(usetdata.photoURL)
                setusername(usetdata.displayName)
                    setuseremail(usetdata.email)
                    setfirst(usetdata.first)
                    setlast(usetdata.last)
                    setdob(usetdata.dob)
                    setage(usetdata.age)
                    setgender(usetdata.gender)
                    setcountry(usetdata.country)
                    setstate(usetdata.state)
                    setlanguage(usetdata.language)
                    setaddress(usetdata.address)
                }else{
                    console.log("user not updated")
                    setprofile(null)
                }
            })
           
        }
        else{
            console.log("userid not found")
        }
    }
    console.log(profile)
    useEffect(()=>{
        fetchdata()},[uid]
    )
    console.log(profile)
    const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userDocRef = doc(_DB, "user_profile", uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    if (uid) {
      fetchUserProfile();
    }
  }, [uid]);
   




    
  return (
    <section className='myaccount'>
   
      
    <div className='inner'>
        <div>
        <img src={authuser?.photoURL} className='imag' />   


        </div>
      
        <div className='yasirr'>
        {username}
        </div >
        <div className='mail'>
            {useremail}
        </div>

        </div>
       
        
    

   


   {profile? <> <section> 

        <div  className='full'>
            <div className='border'>
                <div className='fullname2'>
                <span className='fullname'>
                 <h1>FULL NAME : </h1>
            </span>
            <span className='first-last'>
                <span>
                    {first}
                  
                </span>
                <span>  {last}</span>
                </span>

                </div>
           
       

            <span>
                <span className='boder-dob'>
                <h1 className='dob'> 
                    DOB:

                </h1>
                <span className='dob2'>
                {dob}
                </span>
            

                </span>
                
                <span>
                    <h1 className='age'> 
                        Age:

                    </h1>
                    <span className='age2'>
                        {age}
                    </span>
                    <div className='border2'> 
                    <span>
                        <h1 className='gender'>
                            Gender :
                        </h1>
                        <span className='gender2'>
                            {gender}
                        </span>


                    </span>
                    <span>
                        <h1 className='state'>
                            State:
                        </h1>
                        <span className='state2'>
                            {state}

                        </span>

                    </span>
                    <span className='addre'>
                        Address:    
                    </span>
                    <span className='addre2'>
                        {address}
                    </span>

                    </div>

            
            
                    
                    <span>
                        <h1 className='address'>
                            country :
                        </h1>
                        <span className='address2'>  
                             {country}
                        </span>
                    </span>
                   
                    <span>
                        <h1 className='lang'> 
                        Language:
                        </h1>
                    </span>
                    <span className='lang2'> 
                          {language}
                          
                    </span>

                </span>
            </span>

        </div>
    </div>
    
    
    </section></>:  <div className='info'> 
        user information
   
        <FaUserXmark  className='sign'/>
        <NavLink to="/profile/ad"> 
        <button className='adddata'>
            Add Data
        </button>
        </NavLink>
    </div>}


</section>

  )
}

export default Myaccount
