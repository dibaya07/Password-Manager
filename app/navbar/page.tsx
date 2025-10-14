'use client'
import Link from 'next/link'
import React from 'react'
import Logout from '../logout/page'

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLogin, userInfo } = useAuth();

  return (
    <>
      <div className=' lg:bg-white lg:shadow-xl rounded-2xl lg:mt-2.5 lg:w-11/12 mx-auto text-black lg:p-4 flex justify-between lg:border border-black/20 border-solid'>
        <div className="logo  w-1/4 lg:w-auto  px-1 py-2 lg:p-0  leading-4 lg:leading-normal bg-black lg:bg-transparent m-0.5 lg:m-0 lg:text-left text-center rounded-sm lg:rounded-none">
          <Link href='/' className='font-bold text-xs text-white lg:text-black lg:text-2xl '>Password Manager</Link>
        </div>
        <div className="navtwo font-medium text-xs lg:text-xl lg:w-1/2 flex lg:justify-around flex-1 lg:flex-none justify-between items-center lg:items-start px-1.5">
          <Link href='/docs' className='px-2 lg:px-0'>How it works</Link>
          {isLogin ? <><Link href='/profile'>Profile</Link> <Logout /> </> : <Link href='/login'>Login</Link>}
        </div>
      </div>
      <div>
        <h1 className={`font-bold text-xl lg:text-2xl capitalize mx-2 my-4 lg:m-6  ${!isLogin && 'text-red-600'}`}>{isLogin ? `Welcome ${userInfo?.username}` : "login To save data"}</h1>
      </div>
    </>
  )
}

