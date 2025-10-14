"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from "../context/AuthContext";

export default function Signup() {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const { setIsLogin } = useAuth();

    const onSignup = async () => {
        try {
            const response = await axios.post('/api/user/signup', user)
            console.log('signup success', response)
            setIsLogin(true)
            router.push('/')
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log("login failed", error.message);
                alert(error.message);
            }

        }
    }
    return (
        <div className=' bg-[#f8f9fa] h-screen flex justify-center items-center'>
            <div className="loginPage bg-white  flex flex-col w-full md:w-2/5 md:rounded-2xl p-6 shadow-lg">

                <h1 className='font-bold text-3xl my-3'>signup</h1>
                <div className="username  my-2 flex flex-col">

                    <label htmlFor="username" className='text-xl mb-1.5'>Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder='Enter your username'
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className='border border-solid border-black rounded-sm p-1'
                    />
                </div>
                <div className="email  my-2 flex flex-col">

                    <label htmlFor="email" className='text-xl mb-1.5'>email</label>
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
                <div className="password  my-2 flex flex-col">

                    <label htmlFor="password" className='text-xl mb-1.5'>password</label>
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
                <button onClick={onSignup} className='rounded-sm bg-black text-white p-2 my-4'>Submit</button>
                <Link href='/login' className='text-xl hover:underline'> Already have a account </Link>
            </div>
        </div>
    )
}
