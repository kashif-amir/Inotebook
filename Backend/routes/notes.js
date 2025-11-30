const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

//ROUTE 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required 
router.get('/fetchallnotes', fetchuser,
    async (req, res) => {
        try {
            const notes = await Note.find({user: req.user.id});
            res.json(notes);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    });

//ROUTE 2: Create a notes using: POST "/api/notes/addnote". Login required 
router.post('/addnote', fetchuser,
    [
        body('title', 'title must be at least 3 characters long').isLength({ min: 3 }),
        body('description', 'description must be at least 5 characters long').isLength({ min: 5 }),
    ],
    async (req, res) => {
        try{
            const {title, description, tag} = req.body;
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()});
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            });
            const savedNote = await note.save();
            res.status(200).json(savedNote);
        } catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    });

//ROUTE 3: update the existing notes using: PUT "/api/notes/Updatenote". Login required 

router.put('/updatenote/:id', fetchuser,
    async (req, res) => {
        const {title, description, tag} = req.body;
        try {
            //create a newNote object
            const newNote = {};
            if(title){newNote.title = title;}
            if(description){newNote.description = description;}
            if(tag){newNote.tag = tag;}

            //Check the note exists
            const note = await Note.findById(req.params.id);
            if(!note){
                return res.status(404).send("Not Found");
            }
            //if note not belongs to the user
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed");
            }
            //Update the note
            const updateNote = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
            res.status(200).json({updateNote});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    });

const mongoose = require("mongoose");

router.delete('/deletenote/:id', fetchuser, async (req, res) => { 
  try { 
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send("Invalid Note ID");
    }

    const note = await Note.findById(req.params.id); 
    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const deletednote = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({
      Success: "Note has been deleted",
      deletednote
    });

  } catch (error) { 
    console.error(error.message); 
    res.status(500).send("Internal Server Error"); 
  } 
});


module.exports = router;