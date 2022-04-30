//required packages
const express = require('express');
const fs = require('fs');
const notes = require("./db/db.json");
const path = require('path');
const uuid = require("uuid");

const PORT = process.env.PORT || 3001

const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Routes for the API's
app.get('/api/notes', (req, res) => {
    console.log("Here")
    res.sendFile(path.join(__dirname, "/db/db.json" ))
});

app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
});

app.delete('/api/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const deleteNote = notes.filter((removeNote) => removeNote.id !== req.params.id);
    fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
    res.json(deleteNote);
})

//html routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });