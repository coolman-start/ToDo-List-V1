const express = require("express");
const bodyParser = require("body-parser");

let app = express();

app.set('view engine', 'ejs');

// This is required to load static files like images and css
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extend:true}));

let items = ["Buy Food", "Cook Food", "Eat Food"]; // array to store item
//get
app.get('/', function (req, res) {
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, newListItems: items});
}); // end of get

// post
app.post('/', function(req, res) {
  item = req.body.newitem;
  items.push(item);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
})
