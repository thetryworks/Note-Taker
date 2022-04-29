const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    console.log("Here")
    res.sendFile(path.join(__dirname, "/db/db.json" ))
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });