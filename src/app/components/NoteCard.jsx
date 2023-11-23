import React from 'react'

export const NoteCard = ({ id, content }) => {
    return (
        <div className=' bg-sky-400 p-2 mb-3 rounded-lg border-rose-400 border-solid border-x-2'>
            <p>
            {content}
            </p>
            <p>{id}</p>
        </div>
    )
}
