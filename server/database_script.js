const mongoose = require("mongoose");
const schemas = require("./schemas");
const fs = require("fs");

const User = mongoose.model("User");
const Event = mongoose.model("Event");
const Authentication = mongoose.model("Authentication");

mongoose.connect("mongodb://localhost:27017/eventplannerDB", {
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
  if (option === "populate") {
    populateDatabase();
  } else if (option === "clear") {
    clearDatabase();
  } else {
    console.log("Usage: node database_schema.js <option>");
    console.log("   Options: populate - Populates database with test data");
    console.log("   Options: clear - Clears the database of all data");
    process.exit();
  }
});

var option = process.argv[2];

createTestUser = async function () {
  const newUser = new User({
    username: "Test@gmail.com",
    name: "Test User"
  });
  newUser.password = newUser.generateHash("password");
  const isTestUserThere = await User.findOne({ username: "Test@gmail.com" });

  if (isTestUserThere === null) {
    await newUser.save();
  }
};

createTestUserAuthentication = async function () {
  const testAuth = new Authentication({
    username: "Test@gmail.com",
    authToken: "Test",
    expiration: 0
  });
  const userExists = await Authentication.findOne({
    username: "Test@gmail.com"
  });

  if (userExists === null) {
    await testAuth.save();
  }
};

createTestUserEvents = async function () {
  var date = new Date();

  const collaborators = [
    {
      name: "John Doe",
      username: "TestUser1",
      photoURL: ""
    },
    {
      name: "John Cena",
      username: "TestUser2",
      photoURL: ""
    },
    {
      name: "Joe DiMaggio",
      username: "TestUser3",
      photoURL: ""
    },
    {
      name: "Jerek Deter",
      username: "TestUser4",
      photoURL: ""
    },
    {
      name: "Baseball Guy",
      username: "TestUser5",
      photoUrl: ""
    },
    {
      name: "FootBall Fred",
      username: "TestUser6",
      photoURL: ""
    },
    {
      username: "Test@gmail.com",
      name: "testName",
      photoURL: "testurl.com"
    }
  ];

  const viewers = [
    {
      name: "Minny Mouse",
      username: "MM",
      photoURL: ""
    },
    {
      name: "Mickey Mouse",
      username: "MM2",
      photoURL: ""
    },
    {
      name: "Momma Odie",
      username: "MO",
      photoURL: ""
    },
    {
      name: "Rick Astley",
      username: "RA",
      photoURL: ""
    },
    {
      name: "BYU Guy",
      username: "BYUG",
      photoUrl: ""
    },
    {
      name: "Chandler Bing",
      username: "chandlerbing@bing.com",
      photoURL: ""
    }
  ];



  const Event1 = new Event({
    eventID: "12346",
    title: "Wedding",
    viewers: viewers,
    date: {
      startDate: date.getDate() + 7,
      displayDate: "displayDate test1"
    },
    collaborators: collaborators,
    location: {
      address: "50 N West Temple, Salt Lake City, UT 84150"
    },
    color: "#FFA089"
  });

  const Event2 = new Event({
    eventID: "12347",
    title: "Burfday",
    viewers: viewers,
    date: {
      startDate: date.getDate() + 7,
      displayDate: "displayDate test1"
    },
    collaborators: collaborators,
    location: {
      address: "Provo, UT 84606"
    },
    color: "#FFD958",
  });

  const Event3 = new Event({
    eventID: "12348",
    title: "Funeral",
    viewers: viewers,
    date: {
      startDate: date.getDate() + 7,
      displayDate: "displayDate test1"
    },
    collaborators: collaborators,
    location: {
      address: "Provo, UT 84606"
    },
    color: "#E7FF89"
  });

  viewers.push({   //This is gross I know
    username: "Test@gmail.com",
    name: "testName",
    photoURL: "testurl.com"
  });

  const viewOnlyEvent = new Event({
    eventID: "12345",
    title: "View Only Event",
    viewers: viewers,
    date: {
      startDate: date.getDate() + 7,
      displayDate: "displayDate test1"
    },
    collaborators: collaborators.filter(element => element.username !== "Test@gmail.com"),
    location: {
      address: "Provo, UT 84606"
    },
    color: "#FF8989"
  });

  var eventExists = await Event.findOne({ eventID: "12345" });
  // console.log(eventExists);
  if (eventExists === null) {
    await viewOnlyEvent.save();
  }

  eventExists = await Event.findOne({ eventID: "12346" });
  if (eventExists === null) {
    await Event1.save();
  }

  eventExists = await Event.findOne({ eventID: "12347" });
  if (eventExists === null) {
    await Event2.save();
  }

  eventExists = await Event.findOne({ eventID: "12348" });
  if (eventExists === null) {
    await Event3.save();
  }
};

async function clearTestUser() {
  await User.findOneAndDelete({
    username: "Test@gmail.com"
  });
}

clearTestUserAuthentication = async function () {
  await Authentication.findOneAndDelete({
    username: "Test@gmail.com"
  });
};

clearEvents = async function () {
  await Event.findOneAndDelete({
    eventID: "12345"
  });
  await Event.findOneAndDelete({
    eventID: "12346"
  });
  await Event.findOneAndDelete({
    eventID: "12347"
  });
  await Event.findOneAndDelete({
    eventID: "12348"
  });
};

populateDatabase = async function () {
  await createTestUser();
  await createTestUserAuthentication();
  await createTestUserEvents();
  console.log("Database Populated!");
  process.exit();
};

clearDatabase = async function () {
  await clearTestUser();
  await clearTestUserAuthentication();
  await clearEvents();
  console.log("Database Cleared!");
  process.exit();
};
