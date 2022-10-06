//server.js
const express = require('express');
const app = express();

app.use("/test", (req, res) => {
    res.send({ message: 'pass!' });
    res.end();

});

module.exports = app;
