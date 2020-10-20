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





# Other React Data -------
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


# API Endpoints

## /login
### POST
Accepts: username, password\
Returns: success, authToken\
Note: Could this return the events and invitations for the user so the frontend doesn't need to request them separately?\

## /register
### POST
Accepts: email, password, name\
Returns: success, authToken\
Note: We need to change the name from email to username, frontend should send it as username so it's standardized. This could also return events and invitations like login.\

## /event
### GET - returns event corresponding to requested eventID
Accepts: authToken (in header), eventID\
Returns: event\

### POST
Accepts: authToken (in header), eventName (required), location, collaborators, viewers, past
Returns: success, message\
Note: We're going to have it return the eventID also\

### PUT
Accepts: authToken (in header), eventID (required), eventName, location, collaborators, viewers, past\
Returns: success, message\
Note: Backend will update any values included in the request to the event with the corresponding eventID\

### DELETE
Accepts: authToken (in header), eventID\
Returns: success, message\

## /events
### GET - returns all events corresponding to logged in user
Accepts: authToken (in header)\
Returns: list of events\

## /invitation
I think the only endpoint we need is for GET because the invitations sent when the user creates/updates an event and sets the collaborators\
Accepts: authToken (in header)\
Returns: list of events?\

