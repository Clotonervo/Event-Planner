[Class Wiki](https://github.com/cs428TAs/f2020/wiki/Event-planning-app)

# Cloning the Project
When you first clone the project, you need to make sure all dependencies are installed for both the client and server sides.
Once you clone the repo, follow these steps:
* Open a new terminal in the client folder
* Run `npm install` and wait for it to finish
* Open another terminal in the server folder
* Run `npm install` inside the server folder and wait for it to finish

## Running the app
To start the server, open a terminal in the server folder and run `node server.js`. This will start the server at localhost:5000
To start the client, open a terminal in the client folder and run `npm start`. This will start the React app at [http://localhost:3000](http://localhost:3000)

I have left the default React readme below for more information.

## Populating the Database
For testing there is a database script that should populate the database with some test data. We should be updating this as features get added as well to keep up.
to run it, all you need to do is navigate to the server folder and run `node test_info.js`. It will provide you various options, but for simplicity I'll state them here:
* `node database_script.js populate` - populate all test user information into database (Username: Test@gmail.com, password: password)
* `node database_script.js clear` - This will clear all test user information from database if you want to start fresh

# API Endpoints

## /login
### POST
Accepts: username, password\
Returns: success, authToken\
Request:
```
{
    "username": "Test@gmail.com",
    "password": "password"
}
```
Response: 
```
{
    "success": true,
    "authToken": "xxxxxxxx-xxxx-xxxxx-xxxxxx-xxxxxxxxxxxx"
}
```

## /register
### POST
Accepts: email, password, name\
Returns: success, authToken\
Note: We need to change the name from email to username, frontend should send it as username so it's standardized. This could also return events and invitations like login.\
(We wouldn't want to return the events and invitations because the login page is completely separate from the home page, and there's not a way to pass data between the two)

## /event
### GET - returns event corresponding to requested eventID
Accepts: authToken (in header), eventID\
Returns: event
Question: are you expecting event/{eventID} or is the eventID expected as the req body? 

### POST
Accepts: authToken (in header), eventName (required), location, collaborators, viewers, past
Returns: success, message\
Note: We're going to have it return the eventID also\
Question: will we also want an event description or time field? Where will the todos be saved? 

### PUT
Accepts: authToken (in header), eventID (required), eventName, location, collaborators, viewers, past\
Returns: success, message\
Note: Backend will update any values included in the request to the event with the corresponding eventID

### DELETE
Accepts: authToken (in header), eventID\
Returns: success, message

## /events
### GET - returns all events corresponding to logged in user
Accepts: authToken (in header)\
Returns: list of events

## /invitations
I think the only endpoint we need is for GET because the invitations sent when the user creates/updates an event and sets the collaborators\
Accepts: authToken (in header)\
Returns: list of events?\
Question: do we need an endpoint to mark an invitation as opened? 
