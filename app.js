const express = require("express")
const bodyParser = require("body-parser")

const app = express();
const date = require(__dirname + "/date.js")

app.use(bodyParser.urlencoded({extended:true }))
app.use(express.static("public"))
app.set("view engine", "ejs");

let items = [];
let workItems = [];

app.get("/", (req, res) => {
    let day = date.getDay()
    res.render("list", {
    listTitle: day,
    newListItems: items
  })
});

app.post("/", (req, res) => {
  let item = req.body.newItem
  if (req.body.button === "Work List"){
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  }

})

app.get("/work", (req,res) => {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  })

})

app.post("/work", (req, res) => {
  let item = req.body.newItem
  items.push(item)
  res.redirect("/work")
})

app.get("/about", (req,res) => {
  res.render('about');
})

app.listen(3000, function() {
  console.log("Server started")
})
