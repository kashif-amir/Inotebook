import React, {useContext} from 'react'
import NoteContext from "../context/notes/noteContext";

const NoteItem = (props) => {

  const context = useContext(NoteContext);
	const { deleteNote, editNote } = context;

  const { note } = props;
  return (
    <div className='col-md-3' >
      <div className="card" >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i className="fa-solid fa-trash mx-2" onClick={() => deleteNote(note.id)}></i>
              <i className="fa-regular fa-pen-to-square mx-2" ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
