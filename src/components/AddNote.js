import React, { useContext, useState } from 'react'
import noteContext from '../context/NoteContext';
const AddNote = () => {
    let context=useContext(noteContext);
    let {addNote}=context;
    const [note,setNote]=useState({title:"",desciption:"",tag:""})
    
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <>
            <h2>Add Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" name="title" onChange={onchange} className="form-control" id="title" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" name="description" onChange={onchange} className="form-control" id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" name="tag" onChange={onchange} className="form-control" id="tag" />
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e)=>{e.preventDefault();addNote(note.title,note.description,note.tag)}}>Add Note</button>
            </form>
        </>
    )
}
export default AddNote;