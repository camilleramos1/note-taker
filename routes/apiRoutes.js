// Import fs 
const fs = require('fs');
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
// using uuid for unique id for each note
const uuid = require('uuid');

// creating a const for the JSON parse
const notes = JSON.parse(fs.readFileSync('db/db.json'));

// using this for routing
module.exports = (app) => {
    // get route for api/notes
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, 'db/db.json'));
    });
    // post request for api/notes using JSON including err catching
    app.post('/api/notes', (req, res) => {
        const newNote = {
            title: req.body.title,
            text: req.body.text,
        };
        newNote.id = uuid();
        notes.push(newNote);
        const noteString = JSON.stringify(notes);
        fs.writeFile('db/db.json', noteString, err => {
        if (err) throw err;
        res.json(notes);
        });
    });
    // delete notes using id
    app.delete('/api/notes/:id', (req, res) => {
        console.log("Notes: ",notes);
        const deleteNote = notes.filter((note) => note.id !== req.params.id);
        const noteString = JSON.stringify(deleteNote);
        fs.writeFileSync('db/db.json', JSON.stringify(deleteNote), err => {
        res.json(err);
        });
        res.json(notes);
        // should this be res.json(deleteNote)??
    });
};