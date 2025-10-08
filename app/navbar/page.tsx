'use client'
import Link from 'next/link'
import React from 'react'
import Logout from '../logout/page'

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLogin } = useAuth();

  return (

    <div className=' lg:bg-white lg:shadow-xl rounded-2xl lg:mt-2.5 lg:w-11/12 mx-auto text-black lg:p-4 flex justify-between lg:border border-black/20 border-solid'>
      <div className="logo  w-1/4 lg:w-auto p-2 lg:p-0">
        <Link href='/' className='font-bold text-sm lg:text-2xl '>Password Manager</Link>
      </div>
      <div className="2nav font-medium text-xs lg:text-xl lg:w-1/2 flex lg:justify-around flex-1 lg:flex-none justify-between items-center lg:items-start">
        <Link href='/docs' className='px-2 lg:px-0'>How it works</Link>
        {isLogin ? <><Link href='/profile'>Profile</Link> <Logout /> </> : <Link href='/login'>Login</Link>}
      </div>
    </div>
  )
}

