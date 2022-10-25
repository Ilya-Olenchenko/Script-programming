const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });

let mydb;

app.use(express.static(__dirname + "/public"));

mongoClient.connect(function (err, student) {
    if (err) return console.log(err);
    mydb = student;
    app.locals.collection = student.db("mydb").collection("students");
    app.listen(3000, function () {
        console.log("Сервер запущено...");
    });
});

app.get("/api/students", function (req, res) {

    const collection = req.app.locals.collection;
    collection.find({}).toArray(function (err, students) {

        if (err) return console.log(err);
        res.send(students)
    });

});
app.get("/api/students/:id", function (req, res) {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({ _id: id }, function (err, student) {

        if (err) return console.log(err);
        res.send(student);
    });
});

app.post("/api/students", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const studentName = req.body.name;
    const studentLastName = req.body.lastname;
    const studentAge = req.body.age;
    const studentGroup = req.body.group;

    const student = { name: studentName, lastname: studentLastName, age: studentAge, group: studentGroup };

    const collection = req.app.locals.collection;
    collection.insertOne(student, function (err, result) {

        if (err) return console.log(err);
        res.send(student);
    });
});

app.delete("/api/students/:id", function (req, res) {

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({ _id: id }, function (err, result) {

        if (err) return console.log(err);
        let student = result.value;
        res.send(student);
    });
});

app.put("/api/students", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const studentName = req.body.name;
    const studentLastName = req.body.lastname;
    const studentAge = req.body.age;
    const studentGroup = req.body.group;

    const collection = req.app.locals.collection;
    collection.findOneAndUpdate({ _id: id }, { $set: { age: studentAge, lastname: studentLastName, name: studentName, group: studentGroup } },
        { returnOriginal: false }, function (err, result) {

            if (err) return console.log(err);
            const student = result.value;
            res.send(student);
        });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    mydb.close();
    process.exit();
});
