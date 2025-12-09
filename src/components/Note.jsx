import React, {use, useContext} from 'react'
import NoteItem from './NoteItem';
import NoteContext from "../context/notes/noteContext";

const Note = () => {

  const context = useContext(NoteContext);
  const { user } = context;
  console.log(context);
  return (
    <div className='row my-3'>
      <h1>Your Notes</h1>
      {user.map((note)=>{
        return <NoteItem note={note}/>
      })}
    </div>
  )
}

export default Note
