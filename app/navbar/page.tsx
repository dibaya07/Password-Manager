'use client'
import Link from 'next/link'
import React from 'react' //, { useEffect, useState } 
import Logout from '../logout/page'

import { useAuth } from "../context/AuthContext";

export default function Navbar() {


  const { isLogin } = useAuth();


  // console.log(userInfo)
  // console.log(isLogin)
  
  return (
    
      <div className=' bg-white shadow-xl rounded-2xl mt-2.5 w-11/12 mx-auto text-black p-4 flex justify-between border border-black/20 border-solid'>
        <div className="logo">
      <Link href='/' className='font-bold text-2xl'>Password Manager</Link>
        </div>
        <div className="2nav font-medium text-xl w-1/2 flex justify-around">
      <Link href='/docs'>How it works</Link>
      {isLogin ?  <><Link href='/profile'>Profile</Link> <Logout/> </>:   <Link href='/login'>Login</Link>}
      
        </div>
      {/* </nav> */}


    
    </div>
  )
}

