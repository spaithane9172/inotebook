import React, { useContext,useEffect } from 'react'
import noteContext from '../context/NoteContext'
import Noteitem from './Noteitem';

const Notes = () => {
    let context = useContext(noteContext);
    const {notes,getNotes} = context;
    useEffect(()=>{
        getNotes();
    },[])
    return (
        <>
            <h2 className='mt-4'>Your Notes</h2>
            <div className='row my-3'>
                {notes.map((note, index) => {
                    return <Noteitem key={index} note={note} />
                })}
            </div>
        </>
    )
}
export default Notes;