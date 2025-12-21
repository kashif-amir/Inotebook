import React,{useContext} from 'react'
import NoteState from '../context/notes/NoteState';
import NoteContext from "../context/notes/noteContext";
import Note from './Note';
import AddNote from './AddNote';

const Home = () => {
 
  return (
    <div>
      <Note />
    </div>
  )
}

export default Home
