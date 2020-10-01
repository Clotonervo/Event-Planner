const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

// connect to the database
mongoose.connect('mongodb://localhost:27017/eventplannerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

const Login = mongoose.model('Login', loginSchema);

const registerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true}, 
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const Register = mongoose.model('Register', registerSchema)



/* Create a new user for testing: */
const salt = "Test salt 123"  //uuidv4();
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
try {
  newUser.save();
  newLogin.save();
  // newLogin.find();
  console.log("Test user ready!");
} catch (error) {
  console.log(error);
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// Login api endpoint
app.post('/login', async (req, res) => {
  // console.log(req.body);
  //Salt password

  try {
    // let test = await Login.deleteMany();
    // let test2 = await Register.deleteMany();
    // console.log(test);
    let user = await Login.findOne({
      username: req.body.username
    });
    console.log(user);
    //Check database for correct inputs
    if (user === null){
      res.statusCode = 200;
      res.send({ body: "Sign up in order to log in!" });
      return;
    }
    
    var password = crypto.createHash('md5').update(req.body.password + user.salt).digest('hex');

    if (user.password === password){
      res.statusCode = 200;
      res.send({ body: "User logged in successfully!" });
    }
    else {
      //If not correct inputs, then send an error message
      res.statusCode = 200;
      res.send({ body: "Invalid password!" });
    }
  } catch (error) {
    res.statusCode = 200;
    res.send({ body: "Something went wrong!" });
  }
});


app.post('/register', (req, res) => {
  console.log(req.body);
  res.statusCode = 200;
  //Salt password
  //Store name, username, and password into database
  //Return some sort of response
  res.send({ body: "Here is the info" });
});