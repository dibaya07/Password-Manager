"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { decryptData, encryptData } from '../utils/encryption'
import { useAuth } from "../context/AuthContext";


export default function Profile() {
    const secretKey = "dibyaxyztuvsdfh"

    type vaultItems = {
        title: string,
        password: string,
        username: string,
        url: string,
        notes: string,
        _id: string

    }
    type encryptedItems = {
        _id: string,
        encryptedData: string,
    }
    const [vaultData, setvaultData] = useState<vaultItems[]>([])
    const [encryptedData, setEncryptedData] = useState<encryptedItems[]>([])
    const { userInfo, isACAvailable, accessCode, setAccessCode } = useAuth();
    const [editItem, setEditItem] = useState<vaultItems | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAccessCodeEntered, setIsAccessCodeEntered] = useState(false)

    useEffect(() => {
        if (!userInfo?.id) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/passwordDetails/${userInfo?.id}`)
                setEncryptedData(response.data.data)
            } catch (error) {
                console.log("data fetching error", error)
            }
        };
        fetchData();

    }, [userInfo?.id])


    useEffect(() => {
        if (encryptedData.length > 0) {
            const decryptedArray: vaultItems[] = encryptedData.map(item => {
                const decrypted = decryptData<vaultItems>(item.encryptedData, secretKey);
                // console.log(decrypted)
                const { encryptedData, ...rest } = item;
                return {
                    ...rest,
                    ...decrypted,
                };
            });

            setvaultData(decryptedArray);
        }
    }, [encryptedData]);

    const handleEdit = (item: vaultItems) => {
        setEditItem(item);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editItem) return;
        const { _id, ...dataToEncrypt } = editItem;
        const encryptedData = encryptData(dataToEncrypt, secretKey);
        try {
            await axios.put(`/api/passwordDetails/${_id}`, { encryptedData });

            const response = await axios.get(`/api/passwordDetails/${userInfo?.id}`);
            setEncryptedData(response.data.data);
            setEditItem(null);
        } catch (err) {
            console.error(err);
            alert('Update failed!');
        }
    }

    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("Are you sure you want to delete this vault item?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`/api/passwordDetails/${id}`);
            alert("Vault item deleted successfully!");

            const response = await axios.get(`/api/passwordDetails/${userInfo?.id}`);
            setEncryptedData(response.data.data);
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete vault item!");
        }
    };

    const filteredVaultData = vaultData.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAccessSubmit = async () => {
        await axios.post(`/api/accessCode/checkAccessCode/${userInfo?.id}`, { accessCode })
        setIsAccessCodeEntered(true)
        setAccessCode('')

    }


    return (

        <div className="profile flex flex-col ">

            {isACAvailable || !isAccessCodeEntered && (
                <div className="mpin  flex flex-col mx-auto p-6 lg:w-1/2 items-center">
                    <input
                        type="text"
                        placeholder='Enter vault password'
                        value={accessCode || ''}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className='p-2 border border-solid border-black rounded-md  lg:w-1/2'
                    />
                    <button
                        onClick={handleAccessSubmit}
                        className='bg-black rounded-lg text-sm text-white w-1/2 lg:w-1/3  py-2 mx-1 my-2 '
                    >submit</button>
                </div>


            )}

            {isAccessCodeEntered && !editItem &&
                <div className='flex justify-center mb-4'>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='border border-gray-400 lg:w-1/3 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black'
                    />
                </div>}
            {isAccessCodeEntered && !editItem &&
                <div className='flex flex-wrap justify-center h-screen py-6 '>
                    {filteredVaultData.length === 0 && (
                        <p className="text-gray-600 text-lg">No matching vaults found.</p>
                    )}

                    {
                        filteredVaultData.map((item) => {
                            return (
                                <ul key={item._id} className='border border-solid border-black/20 mx-1 md:mx-2 my-2 w-full md:w-2/5 h-fit py-2 px-4 rounded-sm md:rounded-2xl bg-white shadow-lg'>
                                    <li className='md:mt-2 text-lg md:text-xl md:mb-1.5'><span className='font-semibold mr-2 '>Title :</span>{item.title}</li>
                                    <li className='md:mt-2 text-lg md:text-xl md:mb-1.5'> <span className='font-semibold mr-2 '>Username :</span>{item.username}</li>
                                    <li className='md:mt-2 text-lg md:text-xl md:mb-1.5'><span className='font-semibold mr-2 '>Password :</span>{item.password}</li>
                                    <li className='md:mt-2 text-lg md:text-xl md:mb-1.5'><span className='font-semibold mr-2 '>URL :</span>{item.url}</li>
                                    <li className='md:mt-2 text-lg md:text-xl md:mb-1.5'> <span className='font-semibold mr-2 '>Notes :</span>{item.notes}</li>
                                    <div className="btn  ">
                                        <button className='rounded-sm bg-black text-white py-2 px-4 my-4 mx-2' onClick={() => handleEdit(item)}>Edit</button>
                                        <button className=' rounded-sm bg-black text-white py-2 px-4 my-4 mx-2xs'
                                            onClick={() => handleDelete(item._id)}
                                        >Delete</button>

                                    </div>
                                </ul>

                            )


                        })
                    }
                </div>}
            {
                editItem &&
                (
                    <div className='border border-solid border-black/20 md:mx-auto my-6 md:w-2/5 h-fit py-2 px-4 rounded-sm md:rounded-2xl bg-white shadow-lg'>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <h2 className='text-xl font-bold mb-4'>Edit Vault Item</h2>
                            <input
                                type="text"
                                className='border w-full mb-2 p-2 rounded'
                                value={editItem.title}
                                onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                                placeholder="Title"
                            />
                            <input
                                type="text"
                                className='border w-full mb-2 p-2 rounded'
                                value={editItem.username}
                                onChange={(e) => setEditItem({ ...editItem, username: e.target.value })}
                                placeholder="Username"
                                readOnly
                            />
                            <input
                                type="text"
                                className='border w-full mb-2 p-2 rounded'
                                value={editItem.password}
                                onChange={(e) => setEditItem({ ...editItem, password: e.target.value })}
                                placeholder="Password"
                                readOnly
                            />
                            <input
                                type="text"
                                className='border w-full mb-2 p-2 rounded'
                                value={editItem.url}
                                onChange={(e) => setEditItem({ ...editItem, url: e.target.value })}
                                placeholder="URL"
                            />
                            <textarea
                                className='border w-full mb-2 p-2 rounded'
                                value={editItem.notes}
                                onChange={(e) => setEditItem({ ...editItem, notes: e.target.value })}
                                placeholder="Notes"
                            />
                            <div className='flex justify-end gap-2 mt-4'>
                                <button type='button' onClick={() => setEditItem(null)} className='px-4 py-2 bg-gray-300 rounded'>
                                    Cancel
                                </button>
                                <button type='submit' className='px-4 py-2 bg-black text-white rounded'>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
