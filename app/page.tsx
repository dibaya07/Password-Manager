
import React from 'react'
import Generator from './generator/page'
// import Navbar from './navbar/page'

export default function page() {

 
  return (
    
    <div className="home bg-[#f8f9fa] h-screen flex flex-col  justify-center items-center " >
   {/* <div className="generator flex-1 flex justify-center items-center"> */}
      <Generator/>
   </div>

    // </div>
    
  )
}
