import React from "react";
import About from "./About";

const EventEdit = () => {
  const testEvent = {
    collaborators: [
      { fullname: "Jane Doe", username: "test1" },
      { fullname: "John Smith", username: "test2" },
      { fullname: "Donald Duck ", username: "test3" }
    ],
    viewers: [
      { fullname: "Mickey Mouse", username: "test4" },
      { fullname: "Minnie Mouse", username: "test5" },
      { fullname: "Daisy Duck", username: "test6" }
    ]
  };
  //TODO: will need to get the eventId from the url
  // If there isn't an id, then it's a new event
  return (
    <div>
      <About event={testEvent} />
    </div>
  );
};

export default EventEdit;
