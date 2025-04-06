import React from 'react'
import Nav from './Navbar/Nav'
import { Outlet } from 'react-router-dom'
import {Toaster} from "react-hot-toast"

function Layout() {
  return (
    <>
  <Toaster/>
      <Nav/>
      <Outlet/>
      {/* <h1>  HOME PAGE</h1> */}

    </>
  )
}

export default Layout
