import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { createDefaultEvent } from "./defaultEvent";
import ServiceClient from "../../services";
import About from "./About";
import AppBar from "../Common/AppBar";
import CenteredLoadingSpinner from "../Common/CenteredLoadingSpinner";
import Error from "../Common/Error";
import Header from "./Header";
import Layout from "../Layout";
import PageAccess from "../Common/PageAccess";
import ActionPrompt from "../Common/ActionPrompt";
import Stack from "../Common/Stack";
import Tabs from "./Tabs";
import TodoList from "./Todo";
import {
  fontSize24,
  spacing16,
  spacing32,
  theme1
} from "../../resources/style-constants";

const pageViews = {
  about: "About",
  todo: "To-do Lists"
};

const defaultEvent = createDefaultEvent();

const PaddedPrompt = styled(ActionPrompt)`
  margin-top: ${spacing16};
`;

const EventEdit = () => {
  const [currentView, setCurrentView] = useState("About");
  const [eventId, setEventId] = useState("");
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

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let eventId = params.get("id");
    if (eventId) {
      setEventId(eventId);
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
    setOriginalEvent(updatedEvent);
    setEvent(updatedEvent);
  };

  const sortList = (people) => {
    return people.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
  };

  const saveEvent = async () => {
    setSaveStatus({ ...saveStatus, loading: true, error: false, message: "" });
    const newSaveStatus = {
      ...saveStatus,
      error: false,
      message: ""
    };
    try {
      let results;
      if (eventId) {
        //Updating an existing event
        results = await ServiceClient.updateEvent(event);
      } else {
        // creating a new event
        results = await ServiceClient.createEvent(event);
      }
      if (results.success) {
        setOriginalEvent(event);
        setEditing(false);
        //TODO: could add message that the event saved properly
      } else {
        newSaveStatus.error = true;
        newSaveStatus.message =
          results.message || "An error occurred. Please try again later.";
      }
    } catch (error) {
      newSaveStatus.error = true;
      newSaveStatus.message = error.message;
    }

    newSaveStatus.loading = false;

    setSaveStatus(newSaveStatus);
  };

  const discardChanges = () => {
    setEvent(originalEvent);
    setEditing(false);
  };

  const updateTitle = (newTitle) => {
    let updated = { ...event };
    updated.title = newTitle;
    updateEvent(updated);
  };

  const updateDate = (newDate) => {
    let updated = { ...event };
    updated.date.startDate = newDate;
    updateEvent(updated);
  };

  const updateEvent = (updated) => {
    setEditing(true);
    setEvent(updated);
  };

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
              <Header
                event={event}
                onEditDate={updateDate}
                onEditTitle={updateTitle}
              />
              <Layout>
                <Stack gapSize={spacing32}>
                  {editing && (
                    <PaddedPrompt
                      mainText="You made changes to this event"
                      primaryText="Save"
                      primaryOnClick={saveEvent}
                      secondaryText="Discard"
                      secondaryOnClick={discardChanges}
                    />
                  )}
                  {saveStatus.error && (
                    <Error fontSize={fontSize24}>
                      {saveStatus.message ||
                        "Error trying to save. Please try again later."}
                    </Error>
                  )}
                  <Tabs {...{ currentView, pageViews, setCurrentView }} />
                  {currentView === pageViews.about ? (
                    <About event={event} {...{ sortList, updateEvent }} />
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
