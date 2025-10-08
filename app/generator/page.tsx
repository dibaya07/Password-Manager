"use client"
import React, { useState } from 'react'
import PasswordDetailsForm from '../passwordDetailsForm/page'
import axios from 'axios'
import { encryptData } from '../utils/encryption'
import { useAuth } from "../context/AuthContext";
import Link from 'next/link'

// import { useRouter } from 'next/navigation'

export default function Generator() {

    // const router =useRouter()
    const [passwordLength, setPasswordLength] = useState(8)
    const [generatedPassword, setGeneratedPassword] = useState("")
    const [addNumbers, setAddNumbers] = useState(true)
    const [addSymbols, setAddSymbols] = useState(true)
    const [isGenerated, setIsGenerated] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [passwordDetails, setPasswordDetails] = useState({
        title: "",
        username: "",
        password: "",
        url: "",
        notes: "",
    })
    const { userInfo, isLogin } = useAuth();

    const secretKey = "dibyaxyztuvsdfh"


    const numbers = "0123456789";
    const symbols = "!@#$%&*+?";

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
        try {
            const newPasswordDetails = {
                ...passwordDetails,
                title: defaultTitle(),
                password: generatedPassword,
            }

            const encryptedData = encryptData(newPasswordDetails, secretKey);
            // console.log(encryptedData)

            // setPasswordDetails({
            //     ...passwordDetails,
            //     title: defaultTitle(),
            //     password: generatedPassword,
            // })
            await axios.post(`/api/passwordDetails/${userInfo?.id}`, { encryptedData})
            setIsGenerated(false)
        } catch (error) {
            console.log('password direct details not saved', error)
        }

    }
    // if (generatedPassword != '') {
    // }

    const handleSaveDetailsForm = () => {
        setPasswordDetails({ ...passwordDetails, password: generatedPassword })
        setShowForm(true)
        setGeneratedPassword("")
        setIsGenerated(false)
    }
    return (
        <div className={`generatorPage  shadow-lg rounded-2xl  h-fit  ${showForm ? "w-full flex justify-evenly" : "w-2/5 mx-auto bg-white p-6"}`}>


            <div className={`flex flex-col  ${showForm ? "w-1/2 flex justify-evenly bg-white p-6 rounded-2xl shadow-lg" : " px-2"}`}>
                <h1 className='font-bold text-2xl my-4'>Password Generator</h1>

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
                        <button onClick={handleCopy} disabled={!generatedPassword}>{isClicked? "Copied":"Copy"}</button>
                    </div>
                </div>


                {/* <input type="text" /> */}
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

               {!isLogin && <span className='text-lg text-center my-1.5'>Have an account? <Link href='/signup' className='hover:underline'>SignUp </Link>/<Link href='/login' className='hover:underline'> Login</Link></span>}

                <div className="savingBtns py-2 flex justify-center">
                    {isLogin && (!showForm && (isGenerated && <> <button
                        onClick={handleDirectSaving}
                        // disabled={generatedPassword == '' || isGenerated}
                        className='bg-black rounded-lg text-sm text-white w-1/3  py-2 mx-1'
                    >Save without details</button>
                        <button
                            onClick={handleSaveDetailsForm}
                            // disabled={generatedPassword == '' || isGenerated}
                            className='bg-black rounded-lg text-sm text-white w-1/3 py-2 mx-1'
                        >save with details</button></>))
                    }
                </div>
            </div>

            {showForm && <PasswordDetailsForm passwordDetails={passwordDetails} setPasswordDetails={setPasswordDetails} setShowForm={setShowForm} setIsGenerated={setIsGenerated} setGeneratedPassword={setGeneratedPassword} />}

        </div>
    )
}
