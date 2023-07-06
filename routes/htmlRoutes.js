// Import fs 
const fs = require('fs');
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// using this for routing
module.exports = (app) => {
    // route to return notes.html file
    app.get('/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
    // route to return the index.html file
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};