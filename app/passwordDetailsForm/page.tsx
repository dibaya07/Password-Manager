"use client"
import axios from 'axios'
// import { title } from 'process'
import React from 'react'
import { encryptData } from '../utils/encryption'
import { useAuth } from "../context/AuthContext";


interface PasswordDetailType {
  title: string;
  username: string;
  password: string;
  url: string;
  notes: string;
}

interface PasswordDetailsFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGenerated: React.Dispatch<React.SetStateAction<boolean>>;
  setGeneratedPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordDetails: PasswordDetailType;
  setPasswordDetails: React.Dispatch<React.SetStateAction<PasswordDetailType>>; 
}
export default function PasswordDetailsForm({ setShowForm, setIsGenerated, setGeneratedPassword ,passwordDetails,setPasswordDetails}:PasswordDetailsFormProps) {
  const { userInfo,setUserInfo } = useAuth();
 
const secretKey = "dibyaxyztuvsdfh"

  const handleUpdateDetails = async () => {
    
    const encryptedData = encryptData(passwordDetails, secretKey);
    await axios.post(`/api/passwordDetails/${userInfo?.id}`,{encryptedData})
    setShowForm(false)
    setIsGenerated(false)
    setGeneratedPassword("") 
    setPasswordDetails({
        title:"",
        username:"",
        password:"",
        url:"",
        notes:"",
    })
  } 

        // console.log(userInfo?.username)
  return (
    <div className='flex flex-col w-2/5 bg-white rounded-2xl shadow-lg p-6'>
      <h1 className='font-bold text-3xl my-3'>Password Details Form</h1>
<div className="title  my-2 flex flex-col">
      <label htmlFor="title" className='text-xl mb-1.5'>Title</label>
      <input
        type="text"
        placeholder='enter your title'
        id='title'
        value={passwordDetails.title}
        onChange={(e)=>setPasswordDetails({...passwordDetails,title:e.target.value})}
      />
      </div>
      <div className="password  my-2 flex flex-col">
      <label htmlFor="password" className='text-xl mb-1.5'>Password</label>
      <input
        type="text"
        placeholder='enter your password'
        id='password'
        value={passwordDetails.password || ''}
        readOnly
      />
      </div>
      <div className="username  my-2 flex flex-col">
      <label htmlFor="username" className='text-xl mb-1.5'>Username</label>
      <input
        type="text"
        placeholder='enter your username'
        id='username'
        value={userInfo?.username || ""}
        onChange={(e)=>setUserInfo({...userInfo ,username:e.target.value})}
      />
      </div>
      <div className="url  my-2 flex flex-col">
      <label htmlFor="url" className='text-xl mb-1.5'>URL</label>
      <input
        type="text"
        placeholder='enter your url'
        id='url'
        value={passwordDetails.url || ''}
        onChange={(e)=>setPasswordDetails({...passwordDetails,url:e.target.value})}
      />
      </div>
      <div className="notes  my-2 flex flex-col">
      <label htmlFor="notes" className='text-xl mb-1.5'>Notes</label>
      <input
        type="text"
        placeholder='enter your notes'
        id='notes'
        value={passwordDetails.notes || ''}
        onChange={(e)=>setPasswordDetails({...passwordDetails,notes:e.target.value})}
        className='border border-solid border-black rounded-sm p-1'
      />
      </div>

      <button onClick={handleUpdateDetails} className='rounded-sm bg-black text-white p-2 my-4'>Update details</button>
    </div>
  )
}
