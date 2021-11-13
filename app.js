const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

let app = express();

app.set('view engine', 'ejs');

// This is required to load static files like images and css
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extend:true}));

let items = ["Buy Food", "Cook Food", "Eat Food"]; // array to store item
let workItems = [];
//get
app.get('/', function (req, res) {
  let day = date();
  res.render("list", { listTitle: day, newListItems: items});
}); // end of get

// post
app.post('/', function(req, res) {

  let item = req.body.newitem;

  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work")
  }else{
    items.push(item);
    res.redirect('/');
  }

});

// get -- work
app.get('/work', function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems});
})

// app.post('/work', function(req, res) {
//   let item = req.body.newitem;
//   workItems.push(item);
//   res.redirect('/work');
// })

app.get('/about', function(req, res) {
  res.render('about')
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
