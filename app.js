const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food", "Eat Food"];
const newItems = [];


app.get("/", function (req, res) {
  const today = new Date();
  const optoins = {
    weekday: "long",
    day: "numeric",
    month: "long"
  }
  const day = today.toLocaleDateString('en-US', optoins);

res.render("index", { listTitle: day, newListItems: items });
});

app.post('/', function(req, res){
    const item = req.body.listinput;

    if (req.body.button === "Work"){
        newItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
    
});


app.get("/work", function(req, res){
    res.render("index", { listTitle: "Work", newListItems: newItems });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
