import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [{
    "_id": "628f1a70a1d184239eb4bb73",
    "user": "6267fcbb6426c902d67087be",
    "title": "My Title",
    "description": "My description",
    "tag": "general",
    "date": "2022-05-26T06:13:04.297Z",
    "__v": 0
  },
  {
    "_id": "62ab306c705b9e20b8d7a2e1",
    "user": "6267fcbb6426c902d67087be",
    "title": "My TitleNeew",
    "description": "My description111",
    "tag": "general111",
    "date": "2022-06-16T13:30:20.440Z",
    "__v": 0
  }];
  let [notes, setNotes] = useState(notesInitial);
  const getNotes=async ()=>{
    const response=await fetch(`${host}/notes/fetchallnotes`,{
      method:"GET",
      mode:"cors",
      header:{
        "Content-Type":"application/json",
        "auth-tocken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2N2ZjYmI2NDI2YzkwMmQ2NzA4N2JlIn0sImlhdCI6MTY1NTQ4MDE4MH0.AKR7fkwwDJ5E4d8iaoUQGJfmaZtPZMS5UBltX-sY_oM"
      }
    });
    const j=await response.json()
    console.log(j)
  }

  const addNote = async (title, description, tag) => {
    const response=await fetch(`${host}/notes/addnote`,{
      method:"POST",
      header:{
        "Content-Type":"application/json",
        "auth-tocken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2N2ZjYmI2NDI2YzkwMmQ2NzA4N2JlIn0sImlhdCI6MTY1MDk5NTkyNn0.3o4p1ZlYTwPwgNh2VYqZ741vcuY_6Vp9YHXmR8tRss0"
      },
      body:JSON.stringify({title,description,tag})
    })
    let note = {
      "_id": "628f1a70a1d184239eb4bb73",
      "user": "6267fcbb6426c902d67087be",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-05-26T06:13:04.297Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/notes/updatenote/${id}`,{
      method:"PUT",
      header:{
        "Content-Type":"application/json",
        "auth-tocken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2N2ZjYmI2NDI2YzkwMmQ2NzA4N2JlIn0sImlhdCI6MTY1MDk5NTkyNn0.3o4p1ZlYTwPwgNh2VYqZ741vcuY_6Vp9YHXmR8tRss0"

      },
      body:JSON.stringify({title, description, tag})
    });
    const json=await response.json();
    for (let index = 0; index < notes.length; index++) {
      let element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
}
export default NoteState;