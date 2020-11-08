const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const schemas = require("./schemas");
const bcrypt = require("bcrypt");
const util = require("./util");

//------ Database Schemas from schemas.js
const User = mongoose.model("User");
const Event = mongoose.model("Event");
const Authentication = mongoose.model("Authentication");

// Connect to the database
mongoose.connect("mongodb://localhost:27017/eventplannerDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const port = process.env.PORT || 5000;

// Server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


/* ----------------------------- API Endpoints -----------------------------*/
// ----------------------------------------- Login api endpoint
app.post('/login', async function(req, res) {
    try {
        const user = await User.findOne({username: req.body.username});
        if (user === null){
            res.statusCode = 404;
            res.send({
                success: false,
                message: "User not found!"
            });
            return;
        }

        if (user.validPassword(req.body.password)) {
            //Create and store auth token into authentication database
            let authToken = uuidv4();       //Uniquely generated auth token
            let expirationTime = new Date().getTime() + 900000; //Should be 15 minutes after logging in

            const authentication = await Authentication.findOneAndUpdate({username: req.body.username},{authToken: authToken, expiration: expirationTime});

            if (authentication == null){
                res.statusCode = 500;
                res.send({
                    success: false,
                    message: "Error: Could not update authToken!"
                });
            }
            else {
                res.statusCode = 200;
                res.send({
                    success: true,
                    authToken: authToken
                }); 
            }
        } else {
            res.statusCode = 403;
            res.send({
                success: false,
                message: "Invalid credentials!"
            });
        }
    } catch (error) {
        console.log(error);
        res.statusCode = 500;
        res.send({
            success: false,
            message: "Error: Something went wrong in the server!"
        });
    }
}); 

// ----------------------------------------- Register endpoint
app.post("/register", async (req, res) => {
  const user = await User.findOne({username: req.body.username});
    if (user != null) {
        res.statusCode = 200;
        res.send({
          success: false,
          message: "User already exists!"
        });
        return;
    }

    var newUser = new User({ username: req.body.username, name: req.body.name });
    newUser.password = newUser.generateHash(req.body.password);

    try {
        newUser.save();
        let authToken = uuidv4();
        let expirationTime = new Date().getTime() + 15000;

        const testAuth = new Authentication({
            username: req.body.username,
            authToken: authToken,
            expiration: expirationTime
        });

        testAuth.save();

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

// ----------------------------------------- Get Events api
app.get("/event", async (req, res) => {
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
                res.send({
                    success: true,
                    event: event
                });
                return
             }
         }
         else {
             res.statusCode = 401;
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

// // ----------------------------------------- Get all events for a user
app.get("/events", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const authentication = await util.isValidAuth(authHeader);

    if(authentication.timeout){
        res.statusCode = 403;
        res.send({
            success: false,
            message: "This authentication token does not exist"
        });
        return;
    }
    else if(!authentication.isValid){
        res.statusCode = 401;
        res.send({
            success: false,
            message: "This authentication token is expired, please login again"
        });
        return;
    }
    const currentUser = await util.getCurrentUser(authHeader);
    //console.log(currentUser)
    //Get all collaborating events
    const collaborating = await Event.find({
      collaborators: {
        $elemMatch: {
            username: currentUser
        }
      }
    });

    //console.log("collaborators: ");
    //console.log(collaborating);
    
    // Get all view only events
    const viewing = await Event.find({
      viewers: { 
          $elemMatch: {
              username: currentUser
          }
      }
    });


    //console.log("viewing: ");
    //console.log(viewing)

    collaborating.forEach((element) => {
      element["isCollaborator"] = true;
    });
    viewing.forEach((element) => {
      element["isCollaborator"] = false;
    });

    const result = collaborating.concat(viewing);

    result.sort(function (a, b) {
      return b.date - a.date;
    });

    result.forEach((element) => {
      element["past"] = util.isPast(element["date"]);
    });

    res.send({
        success: true,
        events: result
    });

  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.send({
      success: false,
      message: "Error getting user events!"
    });
  }
});

// ----------------------------------------- Update Events api
app.put('/event', async (req, res) => {
    var authHeader = req.headers['authorization'];
    const authentication = await util.isValidAuth(authHeader);
    
    if (!authentication.isValid && !authentication.timeout) {
        //This authentication token does not exist
        res.statusCode = 403;
        res.send({
            success: false,
            message: "This authentication token does not exist"
        });
    } else if (!authentication.isValid && authentication.timeout) {
        //This authentication token is expired, send back to login screen
        res.statusCode = 401;
        res.send({
            success: false,
            message: "This authentication token is expired, please login again"
        });
    } 
    else {
        //Authentication token is valid
        if (req.body.eventID == null) {
            //title is required error
            res.statusCode = 200;
            res.send({
                success: false,
                message: "An event ID is required"
            });
        }
        const event = await Event.findOne({
            eventID: req.body.eventID,
        });
        if (event == null) {
            res.statusCode = 404;
            res.send({
                success: false,
                message: "The provided eventID does not exist in the database."
            });
            return;
        }
        if (req.body.title != null) {
            event.title = req.body.title;
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
        if(req.body.date != null) {
            event.date = req.body.date;
        }
        if (req.body.past != null) {
            event.past = req.body.past;
        }
        if (req.body.description != null) {
            event.description = req.body.description;
        }
        if (req.body.color != null) {
            event.color = req.body.color;
        }
        try {
            event.save();
            res.statusCode = 200;
            res.send({
                success: true,
                message: "Successfully updated event"
            });
        } catch (err) {
            console.log(err)
            res.statusCode = 500;
            res.send({
                success: false,
                message: "Something went wrong saving event!"
            });
        }
    }
});

// ----------------------------------------- Create Event api
app.post("/event", async (req, res) => {
  var authHeader = req.headers["authorization"];
  const authentication = await util.isValidAuth(authHeader);

  if (!authentication.isValid && !authentication.timeout) {
    //This authentication token does not exist
    res.statusCode = 401;
    res.send({
      success: false,
      message: "This authentication token does not exist"
    });
  } else if (!authentication.isValid && authentication.timeout) {
    //This authentication token is expired, send back to login screen
    res.statusCode = 403;
    res.send({
      success: false,
      message: "This authentication token is expired, please login again"
    });
  } else {
    //Authentication token is valid
    if (req.body.title == null) {
      //title is required error
      res.statusCode = 200
      res.send({
        success: false,
        message: "An eventname is required"
      });
    }
    var newEvent = new Event({
      eventID: uuidv4().substring(0, 8),
      title: req.body.title
    });
    //console.log("address: "+req.body.location)
    if (req.body.location != null) {
      newEvent.location = req.body.location;
    }
    if (req.body.collaborators != null) {
      newEvent.collaborators = req.body.collaborators;
    }
    const currentUserUsername = await util.getCurrentUser(authHeader);
    const currentUser = await util.getCurrentUserInfo(currentUserUsername);
    newEvent.collaborators.push(currentUser);
    if (req.body.viewers != null) {
      newEvent.viewers = req.body.viewers;
    }
    if (req.body.date != null) {
      newEvent.date = req.body.date;
    }
    if (req.body.past != null) {
      newEvent.past = req.body.past;
    }
    if (req.body.color != null) {
      newEvent.color = req.body.color;
    }

    try {
      newEvent.save();
      res.statusCode = 200;
      res.send({
        success: true,
        message: "Successfully added event to database with eventID: " + newEvent.eventID
      });

    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.send({
        success: false,
        message: "Failed to save event to database"
      });
    }
  }
});


app.delete("/event", async (req, res) => {
  try {
    var authHeader = req.headers["authorization"];
    const authentication = await util.isValidAuth(authHeader);
    if (authentication.isValid) {
      const event = await Event.findOne({
        eventID: req.body.eventID
      });

      if (event == null) {
        res.statusCode = 404;
        res.send({
          success: false,
          message: "Event matching EventID not found!"
        });
        return;
      }
      const currentUser = await util.getCurrentUser(authHeader);

      if (event.collaborators.includes(currentUser)) {
        //Loop through each user to event and remove that event
        util.removeEventFromUsers(req.body.eventID);
        await Event.deleteOne({ eventID: req.body.eventID });
        res.statusCode = 200;
        res.send({
          success: true,
          message: "Event successfully deleted!"
        });
        return;
      } else {
        res.statusCode = 401;
        res.send({
          success: false,
          message: "You are not apart of this event!"
        });
      }
    } else {
      res.statusCode = 403;
      res.send({
        success: false,
        message: "Authtoken is invalid, please login again to renew!"
      });
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
