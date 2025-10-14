'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useAuth } from "../context/AuthContext";



export default function Login() {
    const router = useRouter()
    const { setIsLogin, setGeneratedPassword, setIsACAvailable, setIsGenerated } = useAuth();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const onLogin = async () => {
        try {
            const response = await axios.post('/api/user/login', user)
            console.log('login success', response)
            setGeneratedPassword('')
            setIsLogin(true)
            setIsACAvailable(false)
            setIsGenerated(false)
            router.push('/')
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("login failed", error);
                alert(error.message);
            }
        }
    }

    return (
        <div className=' bg-[#f8f9fa] h-screen flex justify-center items-center'>
            <div className="loginPage bg-white  flex flex-col w-full md:w-2/5 md:rounded-2xl p-4 lg:p-6 shadow-lg">


                <h1 className='font-bold text-3xl my-3'>Login</h1>
                <div className="email my-2 flex flex-col ">


                    <label htmlFor="email" className='text-xl mb-1.5'>Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder='Enter your email'
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className='border border-solid border-black rounded-sm p-1'
                    />
                </div>
                <div className="password my-2 flex flex-col">


                    <label htmlFor="password" className='text-xl mb-1.5'>Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        placeholder='Enter your password'
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className='border border-solid border-black rounded-sm p-1'
                    />
                </div>
                <button onClick={onLogin} className='rounded-sm bg-black text-white p-2 my-4'>Submit</button>
                <Link href='/signup' className='text-xl hover:underline'> Create a new account here </Link>
            </div>
        </div>
    )
}
