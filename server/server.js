const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const schemas = require('./schemas');
const bcrypt = require('bcrypt');
const util = require('./util');

//------ Database Schemas from schemas.js
const User = mongoose.model('User');
const Event = mongoose.model('Event');
const Authentication = mongoose.model('Authentication');
const UserToEvents = mongoose.model('UserToEvents');



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

const newUser = new User({
    username: "Test@gmail.com",

    name:"Test User",
})
newUser.password = newUser.generateHash("password");

const newUserEvent = new User({
    eventID: "",

    name:"Test User",
})

const testAuth = new Authentication({
    username: "Test@gmail.com",
    authToken: "Test",
    expiration: 0
});


try {
  var result = User.findOne({
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
	User.findOne({
		username: req.body.email
	}, function(err, user){
		if(user != null){
			res.statusCode = 200;
			res.send({
				success: false,
				message: "User already exists!"
			});
			return;
		}

		var newUser = new User({
            username : req.body.email,
            name : req.body.name,
		})
		newUser.password = newUser.generateHash(req.body.password);

    try {
        newUser.save();
			let authToken = uuidv4();
			let expirationTime = new Date().getTime() + 15000;

			const testAuth = new Authentication({
				username: "req.body.username",
				authToken: authToken,
				expiration: expirationTime
			});

        res.statusCode = 200;
        res.send({
            success: true,
            authToken: authToken
        });

    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.send({
          success: false,
        	message: "Error: Something went wrong in the server!"
        });
    }

	});
});

app.get('/event', async (req, res) => {
  try {
         var authHeader = req.headers['authorization'];
         const authTokenResult = await util.isValidAuth(authHeader);
         if(authTokenResult.isValid){
             const event = await Event.findOne({
                 eventID: req.body.eventID
             })

             if (event == null){
                 res.statusCode = 200;
                 res.send({
                     success: false,
                     message: "Event can't be found!"
                 });
                 return;
             }

             else {
                 res.send(event);
             }
         }
         else {
             res.statusCode = 200;
             res.send({
                 success: false,
                 message: "Authtoken is invalid, please login again to renew!"
             })
             return;
         }
     } catch (err) {
         res.statusCode = 500;
         res.send({
             success: false,
             message: "Error: Something went wrong in the server!"
         });
         return;
     }
});

// API to get all events of a user
app.get('/events', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const authentication = await util.isValidAuth(authHeader);

        if(authentication.timeout){
            res.send({
                success: false,
                message: "Error: This authentication token does not exist"
            });
            return;
        }
        else if(!authentication.isValid){
            res.send({
                success: false,
                message: "Error: This authentication token is expired, please login again"
            });
            return;
        }

        const currentUser = await util.getCurrentUser(authHeader);

        const result = await Event.find({
            collaborators: { $in: [currentUser] }
        });

        res.send( result );
    } catch (err) {
        console.log(err);
        res.statusCode = 500;
        res.send({
            success: false,
            message: "Error getting user events!"
        })
    }

})

app.post('/event', async (req, res) => {
    var authHeader = req.headers['authorization'];
    const authentication = await util.isValidAuth(authHeader);

    if (!authentication.isValid && !authentication.timeout) {
        //This authentication token does not exist
        res.send({
            success: false,
            message: "Error: This authentication token does not exist"
        });
    } else if (!authentication.isValid && authentication.timeout) {
        //This authentication token is expired, send back to login screen
        res.send({
            success: false,
            message: "Error: This authentication token is expired, please login again"
        });
    } else {
        //Authentication token is valid
        if (req.body.eventName == null) {
            //eventName is required error
            res.send({
                success: false,
                message: "Error: An eventname is required"
            });
        }
		var newEvent = new Event({
            eventID : uuidv4().substring(0,8),
            eventName : req.body.eventName,
		})
        if (req.body.location != null) {
            newEvent.location = req.body.location;
        }
        if (req.body.collaborators == null) {
            const currentUser = await util.getCurrentUser(authHeader);
            newEvent.collaborators.push(currentUser);
        }
        if (req.body.viewers != null) {
            newEvent.viewers = req.body.viewers;
        }
        if (req.body.past != null) {
            newEvent.past = req.body.past;
        }

        try {
            newEvent.save();
            res.statusCode = 200;
            res.send({
                success: true,
                message: "Successfully added event to database"
            });

        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.send({
                success: false,
                message: "Error: Failed to save event to database"
            });
        }
    }
});

app.put('/event', async (req, res) => {
    var authHeader = req.headers['authorization'];
    const authentication = await util.isValidAuth(authHeader);
    
    if (!authentication.isValid && !authentication.timeout) {
        //This authentication token does not exist
        res.send({
            success: false,
            message: "Error: This authentication token does not exist"
        });
    } else if (!authentication.isValid && authentication.timeout) {
        //This authentication token is expired, send back to login screen
        res.send({
            success: false,
            message: "Error: This authentication token is expired, please login again"
        });
    } else {
        //Authentication token is valid
        if (req.body.eventID == null) {
            //eventName is required error
            res.send({
                success: false,
                message: "Error: An eventID is required"
            });
        }
        const event = await Event.findOne({
            eventID: req.body.eventID,
        });
        if (event == null) {
            res.send({
                success: false,
                message: "Error: The provided eventID does not exist in the database."
            });
            return;
        }
        if (req.body.eventName != null) {
            event.eventName = req.body.eventName;
        }
        if (req.body.location != null) {
            event.location = req.body.location;
        }
        if (req.body.collaborators != null) {
            event.collaborators = req.body.collaborators;
        }
        if (req.body.viewers != null) {
            event.viewers = req.body.viewers;
        }
        if (req.body.past != null) {
            event.past = req.body.past;
        }

        try {
            event.save();
            res.statusCode = 200;
            res.send({
                success: true,
                message: "Successfully updated event"
            });

        } catch (error) {
            console.log(error);
            res.statusCode = 500;
            res.send({
                success: false,
                message: "Error: Failed to update event"
            });
        }
    }
});


app.delete('/event', async (req, res) => {
    try {
        var authHeader = req.headers['authorization'];
        const authentication = await util.isValidAuth(authHeader);
        if(authentication.isValid){
            const event = await Event.findOne({
                eventID: req.body.eventID
            })

            if (event == null){
                res.statusCode = 200;
                res.send({
                    success: false,
                    message: "Event matching EventID not found!"
                });
                return;
            }
            const currentUser = await util.getCurrentUser(authHeader);
            
            if(event.collaborators.includes(currentUser)) {
                //Loop through each user to event and remove that event
                util.removeEventFromUsers(req.body.eventID);
                await Event.deleteOne({ eventID: req.body.eventID });
                res.statusCode = 200;
                res.send({
                    success: true,
                    message: "Event successfully deleted!"
                });
                return;
            }
            else {
                res.statusCode = 200;
                res.send({
                    success: false,
                    message: "You are not apart of this event!"
                });
            }
        }
        else {
            res.statusCode = 200;
            res.send({
                success: false,
                message: "Authtoken is invalid, please login again to renew!"
            })
            return;
        }
    } catch (err) {
        res.statusCode = 500;
        res.send({
            success: false,
            message: "Error: Something went wrong in the server!"
        });
        return;
    }
});



