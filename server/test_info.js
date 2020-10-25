const mongoose = require('mongoose');
const schemas = require('./schemas');
const fs = require('fs') 

const User = mongoose.model('User');
const Event = mongoose.model('Event');
const Authentication = mongoose.model('Authentication');

mongoose.connect('mongodb://localhost:27017/eventplannerDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

/* --------------------------- Create a new user for testing:
 *  Username: Test@gmail.com
 *  Password: password
 *  Salt: Test salt 123
 */

mongoose.connection.on("connected", () => {
    if(option === "populate"){
        populateDatabase()
    }
    else if (option === "clear"){
        clearDatabase()
    }
    else {
        console.log("Usage: node test_info.js <option>");
        console.log("   Options: populate - Populates database with test data");
        console.log("   Options: clear - Clears the database of all data");
        process.exit()
    }
  });

var option = process.argv[2];


createTestUser = async function() {
    const newUser = new User({
        username: "Test@gmail.com",
        name:"Test User",
    })
    newUser.password = newUser.generateHash("password");
    const isTestUserThere = await User.findOne({username: "Test@gmail.com"});

    if(isTestUserThere === null){
        await newUser.save();
    }
}

createTestUserAuthentication = async function() {
    const testAuth = new Authentication({
        username: "Test@gmail.com",
        authToken: "Test",
        expiration: 0
    });
    const userExists = await Authentication.findOne({username: "Test@gmail.com"});

    if(userExists === null){
        await testAuth.save();
    }
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
    
    var eventExists = Event.findOne({ eventID: "12345"})
    if(eventExists === null){
        await viewOnlyEvent.save()
    }

    eventExists = Event.findOne({ eventID: "12346"})
    if(eventExists === null){
        await Event1.save()
    }

    eventExists = Event.findOne({ eventID: "12347"})
    if(eventExists === null){
        await Event2.save()
    }

    eventExists = Event.findOne({ eventID: "12348"})
    if(eventExists === null){
        await Event3.save()
    }
}

async function clearTestUser() {
    await User.findOneAndDelete({
        username: "Test@gmail.com"
    })
}

clearTestUserAuthentication = async function() {
    await Authentication.findOneAndDelete({
        username: "Test@gmail.com"
    });
}

clearEvents = async function() {
    await Event.findOneAndDelete({
        eventID: "12345"
    })
    await Event.findOneAndDelete({
        eventID: "12346"
    })
    await Event.findOneAndDelete({
        eventID: "12347"
    })
    await Event.findOneAndDelete({
        eventID: "12348"
    })
}

populateDatabase = async function() {
    await createTestUser()
    await createTestUserAuthentication()
    await createTestUserEvents()
    console.log("Database Populated!")
    process.exit()
}

clearDatabase = async function() {
    await clearTestUser()
    await clearTestUserAuthentication()
    await clearEvents()
    console.log("Database Cleared!");
    process.exit()
}


