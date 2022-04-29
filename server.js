const express = require('express');

const PORT = process.env.PORT || 3001

const app = express();

app.get("/", (req, res) => {
    console.log("Here")
    res.send("Hi")
})



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });