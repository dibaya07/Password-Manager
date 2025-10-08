"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useAuth } from "../context/AuthContext";


export default function Logout() {
  const router = useRouter()
  const { setUserInfo, setIsLogin } = useAuth();
  const handleLogout = async () => {
    try {
      await axios.get('/api/user/logout')
      setUserInfo(null)
      router.push('/')
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("logout failed", error.message);
        alert(error.message);
      }
    } finally {
      setIsLogin(false)
    }
  }
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
