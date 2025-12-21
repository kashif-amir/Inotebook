import React, {useContext, useState} from 'react'
import NoteContext from "../context/notes/noteContext";

const AddNote = () => {

	const context = useContext(NoteContext);
	const { addNote } = context;
	const [note, setNote] = useState({title:"", description:"", tag:""})
	const onchnage = (e)=>{
		setNote({...note, [e.target.name] : e.target.value})
	}

	const handleClick = (e)=>{
		e.preventDefault();
		addNote(note)
	}
	

  return (
      <div className='container'>
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchnage} />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' onChange={onchnage}/>
          </div>
					<div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onchnage}/>
          </div>
          <button type="submit" className="btn btn-primary">Add Note</button>
        </form>
      </div>
  )
}

export default AddNote
