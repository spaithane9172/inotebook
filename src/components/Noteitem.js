import React, { useContext } from 'react'
import noteContext from '../context/NoteContext';
export default function Noteitem(props) {
    const context=useContext(noteContext)
    const {deleteNote}=context
    const { note } = props;
    return (
        <div className='col-md-3 mb-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}<i className="fa-solid fa-trash ml-5" onClick={(e)=>{e.preventDefault(); deleteNote(note._id)}}></i><i className="fa-solid fa-pen-to-square ml-2"></i></h5>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
