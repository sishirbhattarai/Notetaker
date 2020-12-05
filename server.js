// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
const  app = express();
const  PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//css file to use it on public
app.use(express.static('public'))

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
	res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function(req, res) {
    var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
	res.json(savedNotes[req.params.id]);
	console.log(req.params.id)
});

app.get("*", function(req, res) {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", function(req, res) {
	var savedNotes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
	var newNote = req.body;
	savedNotes.push(newNote);

	fs.writeFileSync("db/db.json", JSON.stringify(savedNotes));
	console.log("Your notes is now saved", newNote);
	res.json(savedNotes);
});

app.delete("/api/notes/:id", function(req, res) {
	var savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
	//splicing the array by 1. 
	savedNotes.splice(req.params.id, 1);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
	res.json(savedNotes);
	
	console.log(savedNotes.splice(req.params.id, 1) );
	
})



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
  });