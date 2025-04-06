import React from 'react'
// import "./style.css"

import { RouterProvider } from 'react-router-dom'
import { mymap } from './route/Map'
import Authcontex from './authcontex/Authucontex'


function App() {
  return (
    <>
    <Authcontex>
    <RouterProvider router={mymap}/>
    </Authcontex>

      
    </>
  )
}


export default App
