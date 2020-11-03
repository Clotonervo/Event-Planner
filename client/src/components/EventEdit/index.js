import React, { useState } from "react";
import About from "./About";
import Header from "./Header";
import Tabs from "./Tabs";
import TodoList from "./Todo";

const pageViews = {
  about: "About",
  todo: "To-do Lists"
};

const EventEdit = () => {
  const [currentView, setCurrentView] = useState("About");
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
    <>
      <Header></Header>
      <Tabs {...{ currentView, pageViews, setCurrentView }} />
      {currentView === pageViews.about ? (
        <About event={testEvent} />
      ) : (
        <TodoList />
      )}
    </>
  );
};

export default EventEdit;
