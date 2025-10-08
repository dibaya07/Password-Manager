"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useAuth } from "../context/AuthContext";


export default function Logout() {
  const router = useRouter()
  const { userInfo, isLogin,setUserInfo,setIsLogin } = useAuth();
    const handleLogout =async()=>{
        try{
            await axios.get('/api/user/logout')
            setUserInfo(null)
            router.push('/')
        }catch(error:any){
            console.log("logout error",error.message)
        }finally{
          setIsLogin(false)
        }
    }
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
