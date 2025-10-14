"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useAuth } from "../context/AuthContext";


export default function Logout() {
  const router = useRouter()
  const { setUserInfo, setIsLogin, setGeneratedPassword, setIsACAvailable, setaccessCodeSetter } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.get('/api/user/logout')
      setUserInfo(null)
      // checkAccessCode()

      router.push('/')
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("logout failed", error.message);
        alert(error.message);
      }
    } finally {
      setIsLogin(false)
      setGeneratedPassword('')
      setaccessCodeSetter(false)
      setIsACAvailable(false)
    }
  }
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}
