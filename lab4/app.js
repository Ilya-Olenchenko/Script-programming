const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const studentScheme = new Schema(
    {
        name: String,
        lastname: String,
        age: Number,
        group: String,
    },
    { versionKey: false }
);
const Student = mongoose.model("Student", studentScheme);

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/usersdb", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function (err) {
    if (err) return console.log(err);
    app.listen(3000, function () {
        console.log("Сервер запущено...");
    });
});

app.get("/api/students", function (req, res) {
    Student.find({}, function (err, students) {

        if (err) return console.log(err);
        res.send(students)
    });

});
app.get("/api/students/:id", function (req, res) {
    const id = req.params.id;
    Student.findOne({ _id: id }, function (err, students) {

        if (err) return console.log(err);
        res.send(students);
    });
});

app.post("/api/students", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const studentName = req.body.name;
    const studentLastName = req.body.lastname;
    const studentAge = req.body.age;
    const studentGroup = req.body.group;

    const student = new Student({ name: studentName, lastname: studentLastName, age: studentAge, group: studentGroup });

    student.save(function (err) {
        if (err) return console.log(err);
        res.send(student);
    });
});

app.delete("/api/students/:id", function (req, res) {
    const id = req.params.id;
    Student.findByIdAndDelete(id, function (err, user) {

        if (err) return console.log(err);
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

    const newStudent = { age: studentAge, lastname: studentLastName, name: studentName, group: studentGroup };

    Student.findOneAndUpdate({ _id: id }, newStudent, { new: true }, function (err, user) {
        if (err) return console.log(err);
        res.send(student);
    });
});
