const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const schemas = require('./schemas');

//------ Database Schemas from schemas.js
const Register = mongoose.model('Register');
const Login = mongoose.model('Login');
const Authentication = mongoose.model('Authentication');


// Connect to the database
mongoose.connect('mongodb://localhost:27017/eventplannerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const port = process.env.PORT || 5000;

// Server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


/* --------------------------- Create a new user for testing: 
 *  Username: Test@gmail.com
 *  Password: password
 *  Salt: Test salt 123 
 */
const salt = "Test salt 123"  //uuidv4(); (this is the code for a unique salt)
const hashedPassword = crypto.createHash('md5').update("password" + salt).digest('hex');

const newUser = new Register({
  username: "Test@gmail.com", 
  password: hashedPassword,
  name: "Test User",
});
const newLogin = new Login({
  username: "Test@gmail.com", 
  password: hashedPassword,
  salt: salt,
});
const testAuth = new Authentication({
  username: "Test@gmail.com",
  authToken: "Test",
  expiration: 0
});
try {
  var result = Login.findOne({
    username: "Test@gmail.com"
  }).then(function (info) {
    if(info == null){
      newUser.save();
      newLogin.save();
      testAuth.save();
    }
  });
    console.log("Test user ready!");
} catch (error) {
  console.log(error);
}
//--------------------------------------^ Test User ^

/* ----------------------------- API Endpoints -----------------------------*/
// Login api endpoint
app.post('/login', async (req, res) => {
  try {
    // console.log(test);
    let user = await Login.findOne({
      username: req.body.username
    });
    //Check database for correct inputs
    if (user === null){
      res.statusCode = 200;
      res.send({ 
        success: false,
        message: "User not found!"
      }); 
      return;
    }

    //Salt password
    var password = crypto.createHash('md5').update(req.body.password + user.salt).digest('hex');

    if (user.password === password){
      //Create and store auth token into authentication database
      let authToken = uuidv4();
      let expriationTime = new Date().getTime() + 15000; //Should be 15 minutes after logging in
  
      let authItem = await Authentication.findOneAndUpdate({
          username: req.body.username,
          authToken: authToken,
          expiration: expriationTime
      })
      
      res.statusCode = 200;
      res.send({ 
        success: true,
        authToken: authToken
      });
    }
    else {
      //If not correct inputs, then send an error message
      res.statusCode = 200;
      res.send({ 
        success: false,
        message: "Invalid credentials!"
      });    
    }
  } catch (error) {
    res.statusCode = 500;
    res.send({ 
      success: false,
      message: "Something went wrong!"
    });  
  }
});

// Register endpoint
app.post('/register', (req, res) => {
  console.log(req.body);
  res.statusCode = 200;
  //Salt password
  //Store name, username, and password into register database
  //Store name, password, and salt into login database
  //Return some sort of response
  res.send({ body: "Here is the info" });
});


app.delete('/event', (req, res) => {
    //When we get more code in for the event objects I will finish this
})