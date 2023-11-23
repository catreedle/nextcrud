"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const url = process.env.NEXT_PUBLIC_API_URL_ITEM
const user = process.env.NEXT_PUBLIC_API_USER


export const NoteInput = () => {
    const [inputValue, setInputValue] = useState('')

    const router = useRouter()

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    async function addNote() {
        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    content: inputValue,
                    user,
                    additionalData: "from client"
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log('success', data);
            router.refresh()
            return data;
        } catch (error) {
            console.error('Error during fetch:', error);
        }

    }
    return (
        <div className=' space-x-3'>
            <input className=' p-2 border-b-2 border-red-400 border-solid focus:outline-none' type='text' value={inputValue} onChange={handleInputChange} placeholder='type something...' />
            <button className=' bg-rose-400 p-2 rounded-lg' onClick={addNote}>Add</button>
        </div>
    )
}
