import React from "react";
import {createBrowserRouter} from 'react-router-dom'
import Layout from "../Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Reset from "../pages/Reset";
import ProfileContainer from "../userprofile/Profilecontainer";
import Add from "../userprofile/Add";
import ProfileContent from "../userprofile/Profilecontent";
import Myaccount from "../userprofile/Myaccount";
import Upload from "../userprofile/Upload" ;
import Admincontainer from "../admin/Admincontainer";
import Admincontent from "../admin/Admincontent";
import Createalbum from "../admin/albumpages/Createalbum";
import Albumcontainer from "../admin/albumlanding/Albumcontainer";
import Album from "../admin/Albums/Album";
import Albumcontent from "../admin/albumlanding/Albumcontent";
import Songs from "../admin/Albums/Songs";
// import Album from "../admin/albumlanding/albumpages/Album"

// import Upload from "../userprofile/Upload";
// import { Outlet } from "react-router-dom";
// import Add from "../userprofile/Add";
// import Addprofile from  "../userprofile/Profilecontainer";




 export let mymap=createBrowserRouter(
    [
        {
            path:"/",
            element:<Layout/>,
            children:[
                // {
                //    path:"/",
                //    element:<Home/> 
                // },
                {
                    path:"/login",
                    element:<Login/>

                },
                {
                    path:"/register",
                    element:<Register/>
                },
                {
                    path:"/reset",
                    element:<Reset/>
        
                   
                },
               {
                path:"/profile",
                element:<ProfileContainer/>,
                children:[
                    
                    {
                        path:"ad",
                        element:<Add/>
                    },
                    {
                        index:true,
                        element:<Myaccount/>
                    },{
                        path:"up",
                        element:<Upload/>
                    }

                ]
               },
               {
                path:"/admin",
                element:<Admincontainer/>,
                children:[
                    {
                        index:true,
                        element:<Createalbum/>

                    }
                ]
               },
               {
                path:"/",
                element:<Albumcontainer/>,
                children:[
                    {
                       index:true,
                       element:<Album/>
                    },{
                        path:"song",
                        element:<Songs/>
                    
                    }
                ]

               }
            
    
            ]
        }
     ]
 )
 