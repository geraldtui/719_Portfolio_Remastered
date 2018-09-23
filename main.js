// Allow us to use the Express framework
var express = require("express");

// Allow us to read files from the file system
var fs = require("fs");

// Setup a new Express app
var app = express();

// The app should listen on port 3000, unless a different
// port is specified in the environment.
app.set("port", process.env.PORT || 3000);

// Specify that the app should use handlebars, and set handlebars as the app's view engine.
var handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({ defaultLayout: "main-layout" }));
app.set("view engine", "handlebars");

let html1 = [];
let html2 = [];
let js4 = [];

var html1_json = {
  title: "html1",
  links: html1
};

var html2_json = {
  title: "html2",
  links: html2
};

var js4_json = {
  title: "js4",
  links: html2
};

// Start reading contents of each directory in /views/week1/html1
fs.readdirSync(__dirname + "/views/week1/html1").forEach(file => {
  // We don't want dot files
  if (file.charAt(0) != ".") {
    html1.push(file);
  }
});

// Start reading contents of each directory in /views/week1/html2
fs.readdirSync(__dirname + "/views/week1/html2").forEach(file => {
  // We don't want dot files
  if (file.charAt(0) != ".") {
    html2.push(file);
  }
});

fs.readdirSync(__dirname + "/views/week6/js4").forEach(file => {
  // We don't want dot files
  if (file.charAt(0) != ".") {
    js4.push(file);
  }
});
app.get("/", function(req, res) {
  var data = {
    navbar_items: [html1_json, html2_json]
  };
  res.render("home", data);
});

// Handle all html1-ex requests
for (let i = 1; i < html1_json.links.length + 1; i++) {
  app.get("/html1-ex" + i, (req, res) => {
    var data = {
      navbar_items: [html1_json, html2_json]
    };
    res.render("week1/html1/ex" + i + "/ex" + i, data);
  });

  console.log(i);
}

app.get("/animatedbook", (req, res) => {
  var data = {
    navbar_items: [html1_json, html2_json],
    layout: "animatedbook-layout"
  };
  res.render("week6/js4/ex05/animatedbook", data);
});

//--------------------------------------------------------
// Ending Functions -- Won't need to edit these that often
//--------------------------------------------------------

// Allow the server to serve up files from the "public" folder.
app.use(express.static(__dirname + "/public"));

app.use(express.static(__dirname + "/views"));

// If no other handlers worked, display a 404 page.
app.use(function(req, res) {
  res.type("text/html");
  res.status(404);
  res.sendFile(__dirname + "/public/error-page.html");
});

// Start the server running.
app.listen(app.get("port"), function() {
  console.log("Express started on http://localhost:" + app.get("port"));
});
