require('dotenv').config();
const express = require("express");
const app = express();

app.get("/", (req, res) => {

    res.send(process.env.HELLO);
});

app.get("/user", (req, res) => {

    res.send({ name: process.env.NAME, age: process.env.AGE, university: process.env.UNIVERSITY });
});

app.listen(3000);
console.log('Сервер запущено!')
