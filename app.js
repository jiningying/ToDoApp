let express = require("express");
let app = express();
let viewsPath = __dirname + "/views/";
// let bodyParser = require("body-parser");
let ejs = require("ejs");

const mongodb = require("mongodb");
const morgan = require('morgan');
//
// let db = [];

/* Customer details
    firstName,
    lastName,
    email,
    phoneNumber
 */

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(express.static("public/img"));
app.use(express.static('css'));
app.use(morgan('common'));


//Configure MongoDB
const MongoClient = mongodb.MongoClient;
// Connection URL
const url = "mongodb://localhost:27017/";
//reference to the database (i.e. collection)
let db;
//Connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true },
    function (err, client) {
      if (err) {
        console.log("Err  ", err);
      } else {
        console.log("Connected successfully to server");
        db = client.db("fit2095db");
      }
    });


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

// POST Requests

app.post("/newCustomer", function(req, res) {
  console.log(req.body);
  // db.push(req.body);

  db.collection('fit2095db').insertOne({ taskName: req.body.firstName, assignTo: req.body.person, dueDate: new Date (req.body.lastName), taskStatus: req.body.status, taskDesc: req.body.email});

  // res.render("allcustomers", { customers: db });
  res.redirect('/getAllCustomers'); // redirect the client to list users page

});


// // POST Requests
//
// app.post("/newCustomer", function(req, res) {
//   console.log(req.body);
//   db.push(req.body);
//   res.render("allcustomers", { customers: db });
// });


app.get("/getAllCustomers", function(req, res) {
  console.log("Homepage request");
  db.collection('fit2095db').find({}).toArray(function (err, data) {
    res.render("allcustomers", {customers: data});
  });
  // res.render("allcustomers", { customers: db });
});
//GET request: send the page to the client to enter the user's name
app.get('/updateStatus', function (req, res) {
  res.sendFile(__dirname + '/views/updatecustomer.html');
});

//POST request: receive the details from the client and do the update
app.post('/updateCustomer', function (req, res) {
  let userDetails = req.body;
  let filter = {_id: mongodb.ObjectId(userDetails.taskID)};
  let theUpdate = {$set: {taskStatus: userDetails.newTaskStatus}};
  db.collection('fit2095db').updateOne(filter, theUpdate);
  res.redirect('/getAllCustomers');// redirect the client to list users page
})

//GET request: send the page to the client to enter the user's name
app.get('/deleteCustomers', function (req, res) {
  res.sendFile(__dirname + '/views/deletecustomer.html');
});

//POST request: receive the user's name and do the delete operation
app.post('/deleteCustomer', function (req, res) {
  let userDetails = req.body;
  let filter = {_id: mongodb.ObjectId(userDetails.taskID)};
  db.collection('fit2095db').deleteOne(filter);
  res.redirect('/getAllCustomers');// redirect the client to list users page

});

app.get('/deleteAll', function(req, res) {
  db.collection('fit2095db').deleteMany({taskStatus : 'Complete'}, function(err, obj) {
    // db.collection('fit2095db').find({}).toArray(function(err, result) {
    //   // res.render("allcustomers", {
    //   //   customers: result,
    //   // });
    //
    // });

    console.log(obj.result);

  });
  res.redirect('/getAllCustomers'); // redirect the client to list users page
});


//GET request: send the page to the client to enter the user's name
app.get('/deleteDate', function (req, res) {
  res.sendFile(__dirname + '/views/deleteDatecustomer.html');
});

//POST request: receive the user's name and do the delete operation
app.post('/deleteDatecustomer', function (req, res) {
  let userDetails = req.body;
  // let filter = {dueDate: Date(userDetails.deleteDateID)};

  let filter = {dueDate: {"$gte":new Date(userDetails.deleteDateID)}};

  db.collection('fit2095db').deleteMany(filter);
  res.redirect('/getAllCustomers');// redirect the client to list users page

});

app.listen(8080);
