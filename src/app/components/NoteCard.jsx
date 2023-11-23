"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const url = process.env.NEXT_PUBLIC_API_URL_ITEM

export const NoteCard = ({ id, content, additionalData }) => {
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
            console.error('Error during fetch:', error); ƒ
        }
    }
    return (
        <div className=' bg-sky-400 p-2 mb-3 rounded-lg border-rose-400 border-solid border-x-2'>
            <p className=' text-lg'>
                <strong>{content}</strong>
            </p>
            <p>{additionalData}</p>
            <button className=' bg-red-600 p-2 mt-8 rounded-lg' onClick={deleteNote}>Delete</button>
        </div>
    )
}
