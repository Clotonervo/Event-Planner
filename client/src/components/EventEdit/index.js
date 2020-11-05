import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createDefaultEvent } from "./defaultEvent";
import ServiceClient from "../../services";
import About from "./About";
import AppBar from "../Common/AppBar";
import CenteredLoadingSpinner from "../Common/CenteredLoadingSpinner";
import Error from "../Common/Error";
import Header from "./Header";
import Layout from "../Layout";
import PageAccess from "../Common/PageAccess";
import Stack from "../Common/Stack";
import Tabs from "./Tabs";
import TodoList from "./Todo";
import { fontSize24, spacing32, theme1 } from "../../resources/style-constants";

const pageViews = {
  about: "About",
  todo: "To-do Lists"
};

const defaultEvent = createDefaultEvent();

const EventEdit = () => {
  const [currentView, setCurrentView] = useState("About");
  const [originalEvent, setOriginalEvent] = useState();
  const [event, setEvent] = useState(defaultEvent);
  const [apiStatus, setApiStatus] = useState({
    loading: false,
    error: false,
    message: false
  });
  const [saveStatus, setSaveStatus] = useState({
    loading: false,
    error: false,
    message: false
  });
  const [editing, setEditing] = useState(false);

  const testEvent = {
    description: "Description of the event",
    location: {
      address: "Provo, UT 84602"
    },
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
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let eventId = params.get("id");
    if (eventId) {
      loadPageData(eventId);
    }
    // eslint-disable-next-line
  }, [location.search]);

  const loadPageData = async (eventId) => {
    setApiStatus({ ...apiStatus, loading: true, error: false });
    const newApiStatus = { ...apiStatus };
    try {
      const results = await ServiceClient.event(eventId);
      if (results.success) {
        prepareData(results.event);
      } else {
        // default message just in case
        newApiStatus.error = true;
        newApiStatus.message = "An error occurred. Please try again later.";
      }
    } catch (error) {
      newApiStatus.error = true;
      newApiStatus.message = error.message;
    }
    newApiStatus.loading = false;

    setApiStatus(newApiStatus);
  };

  const prepareData = (event) => {
    let updatedEvent = { ...event };
    /** Sort viewers and collaborators alphabetically */
    updatedEvent.viewers = sortList(updatedEvent.viewers);
    updatedEvent.collaborators = sortList(updatedEvent.collaborators);
    setEvent(updatedEvent);
    setOriginalEvent(updatedEvent);
  };

  const sortList = (people) => {
    return people.sort((a, b) =>
      a.fullname < b.fullname ? -1 : a.fullname > b.fullname ? 1 : 0
    );
  };

  const saveEvent = async () => {
    //TODO: implement this
  };

  useEffect(() => {
    if (
      originalEvent &&
      JSON.stringify(originalEvent) !== JSON.stringify(event)
    ) {
      //TODO: verify that this works
      setEditing(true);
    }
    console.log("event changed");
    console.log(event);
  }, [event]);

  return (
    <div>
      <PageAccess />
      <AppBar color={theme1} />
      {apiStatus.loading ? (
        <CenteredLoadingSpinner
          size={150}
          color={theme1}
          loading={apiStatus.loading}
        />
      ) : (
        <>
          {apiStatus.error ? (
            <Layout>
              <Error fontSize={fontSize24}>
                {apiStatus.message ||
                  "An error occurred. Please try again later."}
              </Error>
            </Layout>
          ) : (
            <>
              <Header />
              <Layout>
                <Stack gapSize={spacing32}>
                  {editing && <div>Saving button placeholder</div>}
                  {saveStatus.error && (
                    <Error fontSize={fontSize24}>
                      {saveStatus.message ||
                        "Error trying to save. Please try again later."}
                    </Error>
                  )}
                  <Tabs {...{ currentView, pageViews, setCurrentView }} />
                  {currentView === pageViews.about ? (
                    <About event={testEvent} {...{ setEvent }} />
                  ) : (
                    <TodoList />
                  )}
                </Stack>
              </Layout>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EventEdit;
