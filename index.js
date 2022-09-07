// express setup
var express = require("express");
var app = express();

// ejs setup
app.set("view engine", "ejs");

// body parser set up
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

// routes
var task = [];

var complete = [];

// READ
app.get("/", function (req, res) {
  res.render("index", { task: task, complete: complete });
});


// CREATE
app.post("/addtask", function (req, res) {
  var newTask = req.body.newtask;
  task.push(newTask);
  res.redirect("/");
});

// DELETE
app.post("/removetask", function (req, res) {

  var completeTask = req.body.check;
  
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

app.listen(3333, function () {
  console.log("Running on port 3333!");
});
