const mongoose = require('mongoose');
const schemas = require('./schemas');


const User = mongoose.model('User');
const Event = mongoose.model('Event');
const Authentication = mongoose.model('Authentication');

mongoose.connect('mongodb://localhost:27017/eventplannerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

var option = process.argv[2];


createTestUser = async function() {
    const newUser = new User({
        username: "Test@gmail.com",
        name:"Test User",
    })
    newUser.password = newUser.generateHash("password");
    const isTestUserThere = await User.findOne(newUser);

    if(isTestUserThere === undefined){
        newUser.save();
    }
    return;
}

createTestUserAuthentication = async function() {
    const testAuth = new Authentication({
        username: "Test@gmail.com",
        authToken: "Test",
        expiration: 0
    });
    const userExists = await Authentication.findOne(testAuth);

    if(userExists === undefined){
        testAuth.save();
    }
    return;
}

createTestUserEvents = async function() {
    var date = new Date()

    const viewOnlyEvent = new Event({
        eventID: "12345",
        eventName: "View Only Event",
        viewers: ["Test@gmail.com"],
        date: date.getDate() + 7
    })
    
    const Event1 = new Event({
        eventID: "12346",
        eventName: "Wedding",
        collaborators: ["Test@gmail.com"],
        date: date.getDate() + 7
    })
    
    const Event2 = new Event({
        eventID: "12347",
        eventName: "Burfday",
        collaborators: ["Test@gmail.com"],
        date: date.getDate() + 4
    })
    
    const Event3 = new Event({
        eventID: "12348",
        eventName: "Funeral",
        collaborators: ["Test@gmail.com"],
        date: date.getDate() - 7
    })

    var eventArray = [viewOnlyEvent, Event1, Event2, Event3];

    eventArray.forEach(event => {
       insertEvent(event);
    })
}

insertEvent = async function(event) {
    var result = await Event.findOne(event);
       if(result === undefined){
           event.save();
       }
}

clearTestUser = async function() {
    const newUser = new User({
        username: "Test@gmail.com",
        name:"Test User",
    })
    newUser.deleteOne({});
}

clearTestUserAuthentication = async function() {
    const testAuth = new Authentication({
        username: "Test@gmail.com",
        authToken: "Test",
        expiration: 0
    });
    testAuth.deleteOne({});
}

clearEvents = async function() {
    const viewOnlyEvent = new Event({
        eventID: "12345",
        eventName: "View Only Event",
        viewers: ["Test@gmail.com"],
        date: date.getDate() + 7
    })
    
    const Event1 = new Event({
        eventID: "12346",
        eventName: "Wedding",
        collaborators: ["Test@gmail.com"],
        date: date.getDate() + 7
    })
    
    const Event2 = new Event({
        eventID: "12347",
        eventName: "Burfday",
        collaborators: ["Test@gmail.com"],
        date: date.getDate() + 4
    })
    
    const Event3 = new Event({
        eventID: "12348",
        eventName: "Funeral",
        collaborators: ["Test@gmail.com"],
        date: date.getDate() - 7
    })

    var eventArray = [viewOnlyEvent, Event1, Event2, Event3];

    eventArray.forEach(event => {
       event.deleteOne({});
    })
}


if(option === "populate"){
    createTestUser()
    createTestUserAuthentication()
    createTestUserEvents()
    console.log("Database Populated!")
}
else if (option === "clear"){
    clearTestUser()
    clearTestUserAuthentication()
    clearEvents()
    console.log("Database Cleared!");
}
else {
    console.log("Usage: node test_info.js <option>");
    console.log("   Options: populate - Populates database with test data");
    console.log("   Options: clear - Clears the database of all data");
    process.exit();
}

process.exit()