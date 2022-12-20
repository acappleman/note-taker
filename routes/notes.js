const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding tip');
  }
});

notes.delete('/:id', (req, res) => {
    console.log(`Delete request for note ${req.params.id}`)
    const { id } = req.params
    readAndDelete(id, './db/db.json');
    res.json(`Note deleted successfully 🚀`)
});

module.exports = notes;