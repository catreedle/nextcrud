"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const url = process.env.NEXT_PUBLIC_API_URL_ITEM

export const NoteCard = ({ id, content, additionalData }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editValue, setEditValue] = useState(content)
    const router = useRouter()



    async function deleteNote() {
        try {
            const res = await fetch(url + id, {
                method: "DELETE"
            })

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            router.refresh();

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }

    async function updateNote() {
        try {
            const res = await fetch(url + id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: editValue
                })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();
            console.log('success', data);

            setIsEdit(false)
            router.refresh()

        } catch (error) {
            console.error('Error during fetch:', error);
        }
    }
    return (
        <div className=' bg-sky-400 p-2 mb-3 rounded-lg border-rose-400 border-solid border-x-2'>


            {isEdit ? <input value={editValue} onChange={(e) => setEditValue(e.target.value)} /> :
                <p className=' text-lg'>
                    <strong>{content}</strong>
                </p>}

            <p>{additionalData}</p>
            <div className=' space-x-2'>
                <button className=' bg-red-600 p-2 mt-8 rounded-lg' onClick={deleteNote}>Delete</button>
                {isEdit ? <button className=' bg-yellow-500 p-2 mt-8 rounded-lg' onClick={updateNote}>Update</button> : <button className=' bg-yellow-500 p-2 mt-8 rounded-lg' onClick={() => setIsEdit(true)}>Edit</button>}

            </div>

        </div>
    )
}
