import React, {useContext, useEffect} from 'react'
import NoteItem from './NoteItem';
import NoteContext from "../context/notes/noteContext";
import AddNote from './AddNote';

const Note = () => {

  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  console.log(context);
  return (
    <>
      <AddNote />
      <div className='row my-3'>
        <h1>Your Notes</h1>
        {notes.map((note)=>{
          return <NoteItem key={note.id} note={note}/>
        })}
      </div>
    </>
  )
}

export default Note
