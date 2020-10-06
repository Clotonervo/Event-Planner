const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const schemas = require('./schemas');

//------ Database Schemas from schemas.js
const User = mongoose.model('User');
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
newUser.password = newUser.generateHash(tempPassword);

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
app.post('/login', function(req, res) {
    try {
        User.findOne({username: req.body.username}, function(err, user) {
            // Check database for correct inputs
            if (user === null){
                res.statusCode = 200;
                res.send({ 
                    success: false,
                    message: "User not found!"
                }); 
                return;
            }

            if (user.validPassword(req.body.password)) {
                //Create and store auth token into authentication database
                let authToken = uuidv4();       //Uniquely generated auth token
                let expirationTime = new Date().getTime() + 15000; //Should be 15 minutes after logging in

                Authentication.findOneAndUpdate({
                    username: req.body.username,
                    },{
                        authToken: authToken,
                        expiration: expirationTime
                    }, 
                    function(err, authentication){
                        if(err){
                            res.statusCode = 500;
                            res.send({
                                success: false,
                                message: "Error: Could not update authToken!"
                            });
                        } else {
                            res.statusCode = 200;
                            res.send({ 
                                success: true,
                                authToken: authToken
                            });
                        }
                    });
                
            } else {
                res.statusCode = 200;
                res.send({ 
                    success: false,
                    message: "Invalid credentials!"
                });        
            }
    });
    } catch (error){
        console.log(error);
        res.statusCode = 500;
        res.send({ 
            success: false,
            message: "Error: Something went wrong in the server!"
        });   
    }
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