import  { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState(
    [{id:1, title:"sample title", description:"sample description", tag:"sample tag"}, {id:2, title:"sample title 2", description:"sample description 2", tag:"sample tag 2"}]
  );

  const getNotes = async () => {
    const url = `http://localhost:3000/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json",
        "auth-token": "your-auth-token-here"
      },
    });
    const json = await response.json();
    console.log(json);
    // setNotes(json);
  }

  const addNote = async (title, description, tag) => {
    const url = `http://localhost:3000/api/notes/addnote/`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        "auth-token": "your-auth-token-here"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    const newnote = null;
    setNotes(notes.concat(newnote));
  }

  const editNote = async (id, title, description, tag) => {

    const url = `http://localhost:3000/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json",
        "auth-token": "your-auth-token-here"
      },
      body: JSON.stringify({ username: "example" }),
    });
    const json = await response.json();

    notes.map((note) =>{
      if(note.id===id){
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
    }) 
  }

  const deleteNote = async (id) => {
    const url = `http://localhost:3000/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json",
        "auth-token": "your-auth-token-here"
      },
      body: JSON.stringify({ username: "example" }),
    });
    const json = await response.json();
    console.log("deleting note with id " + id);
    setNotes(notes.filter((note) => note.id !== id));
  }


  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
