"use client"
import React, { useState } from 'react'
import PasswordDetailsForm from '../passwordDetailsForm/page'
import axios from 'axios'
import { encryptData } from '../utils/encryption'
import { useAuth } from "../context/AuthContext";
import Link from 'next/link'


export default function Generator() {
    const [passwordLength, setPasswordLength] = useState(8)
    const [addNumbers, setAddNumbers] = useState(true)
    const [addSymbols, setAddSymbols] = useState(true)
    const [isClicked, setIsClicked] = useState(false)
    const { userInfo, isLogin, passwordDetails, setPasswordDetails, showForm, setShowForm, generatedPassword, setGeneratedPassword, isGenerated, setIsGenerated, isACAvailable, setIsACAvailable, accessCode, setAccessCode, accessCodeSetter, setaccessCodeSetter } = useAuth();

    const secretKey = "dibyaxyztuvsdfh"


    const numbers = "0123456789";
    const symbols = "!@#$%&*+?";



    const checkAccessCode = async () => {
        try {
            if (!userInfo) {
                setaccessCodeSetter(true)
                return
            };
            const res = await axios.get(`/api/accessCode/checkAccessCode/${userInfo.id}`)
            setIsACAvailable(res.data.success)
            if (!Boolean(res.data.success)) {
                setaccessCodeSetter(true)
            }

        } catch (error) {
            console.log("accesscode not get", error)
        }
    };

    const generate = () => {
        let allChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let generatedPass = ""

        if (addNumbers) {
            allChar += numbers
        }
        if (addSymbols) {
            allChar += symbols
        }
        if (allChar) {
            allChar = allChar.replace(/[O0Il1]/g, "");
        }
        for (let i = 1; i <= passwordLength; i++) {
            generatedPass += allChar.charAt(Math.floor(Math.random() * allChar.length))
        }

        if (generatedPass != '' && generatedPass.length > 0) {
            setGeneratedPassword(generatedPass)
        }
        setIsGenerated(true)
        if (isLogin) {
            checkAccessCode()
        }


    }

    const handleCopy = () => {
        if (generatedPassword != '' && generatedPassword.length > 1) {
            window.navigator.clipboard.writeText(generatedPassword)
            setIsClicked(true)
        }
        setTimeout(() => {
            window.navigator.clipboard.writeText("")
            setIsClicked(false)
        }, 15000);

    }

    const defaultTitle = () => {
        const now = new Date()

        const date = now.toISOString().split('T')[0]
        const time = now.toTimeString().slice(0, 5)

        return `Untitled password - ${date} ${time}`

    }



    const handleDirectSaving = async () => {
        if (!generatedPassword) {
            return alert('generate password')
        }
        if (!isACAvailable) {
            return setaccessCodeSetter(true)
        }
        try {
            const newPasswordDetails = {
                ...passwordDetails,
                title: defaultTitle(),
                username: userInfo?.username,
                password: generatedPassword,
            }

            const encryptedData = encryptData(newPasswordDetails, secretKey);
            await axios.post(`/api/passwordDetails/${userInfo?.id}`, { encryptedData })
            setIsGenerated(false)
            setGeneratedPassword('')
        } catch (error) {
            console.log('password direct details not saved', error)
        }

    }
    const handleSaveDetailsForm = () => {
        setPasswordDetails({ ...passwordDetails, password: generatedPassword })
        setShowForm(true)
        setGeneratedPassword("")
        setIsGenerated(false)
    }

    const handleAccessSubmit = async () => {
        await axios.post(`/api/accessCode/createAccessCode/${userInfo?.id}`, { accessCode })
        setIsACAvailable(true)
        console.log("done sent ")
    }

    return (
        <div className={`generatorPage  lg:shadow-lg lg:rounded-2xl h-fit ${showForm ? "w-full flex flex-col lg:flex-row lg:justify-evenly" : "lg:w-2/3 mx-auto my-10 lg:my-0 bg-white lg:p-6"}`}>
            {
                isLogin && !isACAvailable && accessCodeSetter && (

                    <div className=' lg:mx-auto flex flex-col items-center p-4'>
                        <h2 className='font-bold text-2xl flex flex-wrap lg:block justify-center'>
                            <span className='text-red-600 w-fit'>Set a password</span>&nbsp;and&nbsp;<span className='text-red-600'>Remember</span>&nbsp; the password
                        </h2>
                        <p className='font-semibold text-lg lg:text-xl my-2 text-center'>
                            This password is required to access your saved passwords!
                        </p>
                        <p className='font-semibold text-lg lg:text-xl my-2 text-center'>
                            Don&apos;t share it with anyone
                        </p>
                        <input
                            type="text"
                            className='w-3/4 lg:w-2/3 border border-black border-solid rounded-sm p-1 my-2'
                            placeholder='Enter your password'
                            value={accessCode || ''}
                            onChange={(e) => setAccessCode(e.target.value)}

                        />
                        <button
                            onClick={handleAccessSubmit}
                            className='bg-black rounded-lg text-sm text-white w-1/2 lg:w-1/3  py-2 mx-1 my-2'
                        >submit</button>
                        <button
                            onClick={() => setaccessCodeSetter(false)}
                            className='bg-black rounded-lg text-sm text-white w-1/2 lg:w-1/3   py-2 mx-1'
                        >Cancel</button>
                    </div>

                )
            }

            {(isACAvailable || !accessCodeSetter) && (
                <div className={`flex flex-col  ${showForm ? "lg:w-1/2  w-full hidden lg:flex justify-evenly bg-white p-6 rounded-2xl shadow-lg" : " px-2"}`}>
                    <h1 className='font-bold text-2xl my-4 text-center lg:text-left bg-black lg:bg-transparent text-white lg:text-black rounded-md lg:rounded-none py-1.5 lg:py-0'>Password Generator</h1>

                    <div className="password  my-2 flex flex-col">


                        <label htmlFor="password" className='text-xl mb-1.5'>Password</label>
                        <div className="genPass border border-black border-solid flex justify-between px-2 rounded-sm">
                            <input
                                type="text"
                                placeholder='Generate password'
                                id='generated-password'
                                value={generatedPassword}
                                disabled
                                className='  p-1'
                            />
                            <button onClick={handleCopy} disabled={!generatedPassword}>{isClicked ? "Copied" : "Copy"}</button>
                        </div>
                    </div>

                    <div className="fulllength  my-2 flex flex-col">
                        <label htmlFor="length" className='text-lg mb-1.5'>Length</label>
                        <div className="length my-2  flex justify-evenly ">
                            <input
                                type="range"
                                id='length'
                                min={1}
                                max={20}
                                value={passwordLength}
                                onChange={(e) => setPasswordLength(Number(e.target.value))}
                                step={1}
                                className='w-3/4'
                            />
                            <input
                                type="text"
                                placeholder='enter length'
                                value={passwordLength}
                                onChange={(e) => setPasswordLength(Number(e.target.value))}
                                className='border border-black border-solid w-1/6 text-center'
                            />
                        </div>
                    </div>

                    <div className="numbers my-2">
                        <input
                            type="checkbox"
                            id='numbers'
                            checked={addNumbers}
                            onChange={() => setAddNumbers(prev => !prev)}
                        />
                        <label htmlFor="numbers" className='text-xl mb-1.5 ml-2'>Numbers</label>
                    </div>

                    <div className="symbols my-2">
                        <input
                            type="checkbox"
                            id='symbols'
                            checked={addSymbols}
                            onChange={() => setAddSymbols(prev => !prev)}
                        />
                        <label htmlFor="symbols" className='text-xl mb-1.5 ml-2'>Symbols</label>
                    </div>


                    <button
                        onClick={generate}
                        disabled={showForm}
                        className={`bg-black rounded-lg text-white w-1/2 mx-auto py-2 disabled:cursor-not-allowed disabled:opacity-70`}
                    >Generate</button>

                    {!isLogin && isACAvailable && <span className='text-lg text-center my-1.5'>Have an account? <Link href='/signup' className='hover:underline'>SignUp </Link>/<Link href='/login' className='hover:underline'> Login</Link></span>}

                    <div className="savingBtns py-2 flex justify-center">
                        {isLogin && (!showForm && (isGenerated && <> <button
                            onClick={handleDirectSaving}
                            className='bg-black rounded-lg text-sm text-white w-1/3  py-2 mx-1'
                        >Save without details</button>
                            <button
                                onClick={handleSaveDetailsForm}
                                className='bg-black rounded-lg text-sm text-white w-1/3 py-2 mx-1'
                            >save with details</button></>))
                        }
                    </div>
                </div>

            )}
            {showForm && <PasswordDetailsForm />}
        </div>
    )
}
