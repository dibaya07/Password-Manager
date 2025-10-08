"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { decryptData } from '../utils/encryption'
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "../context/AuthContext";
// import { useRouter } from 'next/navigation';


export default function Profile() {
    // const router = useRouter()
    const secretKey= "dibyaxyztuvsdfh"
    
    type vaultItems = {
        title: string,
        password: string,
        username: string,
        url: string,
        notes: string,
        
    }
    type encryptedItems = {
        _id: string,
        encryptedData: string,
    }
    const [vaultData, setvaultData] = useState<vaultItems[]>([])
    const [encryptedData, setEncryptedData] = useState<encryptedItems[]>([])
    const { userInfo } = useAuth();
    const [loading, setLoading] = useState(true)

    // console.log(userInfo?.id)

    
    useEffect(() => {


        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/passwordDetails/${userInfo?.id}`)
                // console.log('all encrypted voult', response.data.data)
                setEncryptedData(response.data.data)
            } catch (error) {
                console.log("data fetching error", error)
            } finally {
                setLoading(false)
            }

        }
        fetchData();

    }, [userInfo])

    
    useEffect(() => {
  if (encryptedData.length > 0) {
    const decryptedArray : vaultItems[] = encryptedData.map(item =>
      decryptData(item.encryptedData, secretKey) 
    );

    setvaultData(decryptedArray);
  }
}, [encryptedData]);

// const handleEdit = ()=>{
//     router.push('/profile/edit')
// }

    
  
      

    if (loading) return <p>Loading ...</p>

    return (
        <div className="profile flex flex-col bg-[#f8f9fa]">

        <span className='font-bold text-2xl capitalize m-6 '>Welcome {userInfo?.username}</span>
        <div className='flex flex-wrap justify-center h-screen py-6 '>

            {
                vaultData.map((item) => {
                    return (
                        <ul key={uuidv4()} className='border border-solid border-black/20 mx-2 w-2/5 h-fit py-2 px-4 rounded-2xl bg-white shadow-lg'>
                            <li className='mt-2 text-xl mb-1.5'><span className='font-semibold mr-2 '>Title :</span>{item.title}</li>
                           <li className='mt-2 text-xl mb-1.5'> <span className='font-semibold mr-2 '>Username :</span>{item.username}</li>
                            <li className='mt-2 text-xl mb-1.5'><span className='font-semibold mr-2 '>Password :</span>{item.password}</li>
                            <li className='mt-2 text-xl mb-1.5'><span className='font-semibold mr-2 '>URL :</span>{item.url}</li>
                           <li className='mt-2 text-xl mb-1.5'> <span className='font-semibold mr-2 '>Notes :</span>{item.notes}</li>
                           <div className="btn  ">
                           {/* <button className='rounded-sm bg-black text-white py-2 px-4 my-4 mx-2' onClick={handleEdit}>Edit</button>
                           <button className=' rounded-sm bg-black text-white py-2 px-4 my-4 mx-2xs'>Delete</button> */}

                           </div>
                        </ul>

)


})
}
        </div>
</div>
    )
}
