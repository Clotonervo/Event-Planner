const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const schemas = require('./schemas');

//------ Database Schemas from schemas.js
const User = mongoose.model('User');

// Connect to the database
mongoose.connect('mongodb://localhost:27017/eventplannerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = process.env.PORT || 5000;

// Server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


/* --------------------------- Create a new user for testing: 
 *  Username: Test@gmail.com
 *  Password: password
 */

var tempPassword = "password"
const newUser = new User({
  username: "Test@gmail.com", 
  name: "Test User",
});
newUser.password = newUser.generateHash(tempPassword);

try {
  var result = User.findOne({
    username: "Test@gmail.com"
  }).then(function (info) {
    if(info == null){
      newUser.save();
    }
  });
  console.log("Test user ready!");
} catch (error) {
  console.log(error);
}


//--------------------------------------^ Test User ^

/* ----------------------------- API Endpoints -----------------------------*/
// Login api endpoint
app.post('/login', function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if (!user.validPassword(req.body.password)) {
    	res.send("Incorrect password\n")
	} else {
    	res.send("Correct password!\n")
    }
  });
});


// Register endpoint
app.post('/register', (req, res) => {
  var newUser = new User({
    username : req.body.username,
    name : req.body.name,
  })
  console.log(req.body);
  newUser.password = newUser.generateHash(req.body.password);

  try {
    newUser.save();
    res.statusCode = 200;
    res.send("added user successfully\n")

  } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.send("failed to add user to database")
  }
  
});
