// Import fs 
const fs = require('fs');
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
// using uuid for unique id for each note
const uuid = require('uuid');


// using this for routing
module.exports = (app) => {
    // get route for api/notes
    app.get('/api/notes', (req, res) => {
        let notes = JSON.parse(fs.readFileSync('./db/db.json'));
        res.json(notes);
    });
    // post request for api/notes using JSON including err catching
    app.post('/api/notes', (req, res) => {
        let notes = JSON.parse(fs.readFileSync('./db/db.json'));
        const newNote = {
            title: req.body.title,
            text: req.body.text,
        };
        newNote.id = uuid.v4();
        notes.push(newNote);
        const noteString = JSON.stringify(notes);
        fs.writeFile('./db/db.json', noteString, err => {
        if (err) throw err;
        res.json(notes);
        });
    });
    // delete notes using id
    app.delete('/api/notes/:id', (req, res) => {
        let notes = JSON.parse(fs.readFileSync('./db/db.json'));
        // console.log("Notes: ",notes);
        const deleteNote = notes.filter((note) => note.id !== req.params.id);
        fs.writeFile('./db/db.json', JSON.stringify(deleteNote), 'utf-8', (err) => {
        if (err) throw err;
        res.json(deleteNote);
        });
    });
};