// Import Express.js
const express = require('express');
// Import fs 
const fs = require('fs');
// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');
// Initialize an instance of Express.js
const app = express();
// Specify on which port the Express.js server will run
const PORT = 3001;

// handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// allows express to use static files in public 
app.use(express.static('public'));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });