let express = require("express");
let app = express();
let viewsPath = __dirname + "/views/";
let bodyParser = require("body-parser");
let ejs = require("ejs");

let db = [];

/* Customer details
    firstName,
    lastName,
    email,
    phoneNumber
 */

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static("public/img"));
app.use(express.static('css'));

app.get("/", function(req, res) {
  console.log("Homepage request");
  let fileName = viewsPath + "index.html";
  res.sendFile(fileName);
});
// GET Requests

app.get("/addNewCustomer", function(req, res) {
  console.log("Add New Task request");
  let fileName = viewsPath + "addcustomer.html";
  res.sendFile(fileName);
});
app.get("/getAllCustomers", function(req, res) {
  console.log("Homepage request");
  res.render("allcustomers", { customers: db });
});

// POST Requests

app.post("/newCustomer", function(req, res) {
  console.log(req.body);
  db.push(req.body);
  res.render("allcustomers", { customers: db });
});

app.listen(8080);
