import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ClientService from "../../services";
import AppBar from "../Common/AppBar";
import CenteredLoadingSpinner from "../Common/CenteredLoadingSpinner";
import Error from "../Common/Error";
import EventsSection from "./EventsSection";
import InvitesSection from "./InvitesSection";
import Stack from "../Common/Stack";
import { spacing64, fontSize24, theme1 } from "../../resources/style-constants";

const testInvites = [
  { name: "event1", isUnopened: true, id: "1" },
  { name: "event2", isUnopened: true, id: "2" },
  { name: "event3", isUnopened: false, id: "3" },
  { name: "event4", isUnopened: true, id: "4" },
  { name: "event4", isUnopened: true, id: "5" },
  { name: "event4", isUnopened: false, id: "6" },
  { name: "event4", isUnopened: true, id: "7" },
  { name: "event4", isUnopened: true, id: "8" },
  { name: "event4", isUnopened: true, id: "9" }
];

const testEvents = [
  {
    neventId: "123",
    eventName: "Event 1",
    location: "123 Apple St.",
    collaborators: [],
    viewers: [],
    past: true
  },
  {
    eventId: "123",
    eventName: "Event 2",
    location: "123 Apple St.",
    collaborators: [],
    viewers: [],
    past: false
  },
  {
    eventId: "123",
    eventName: "Event 3",
    location: "123 Apple St.",
    collaborators: [],
    viewers: [],
    past: false
  }
];

const Main = () => {
  const [invites, setInvites] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [apiStatus, setApiStatus] = useState({
    loading: false,
    error: false,
    message: false
  });

  useEffect(() => {
    loadPageData();
  }, []);

  const loadPageData = async () => {
    setApiStatus({ ...apiStatus, loading: true, error: false });
    const newApiStatus = { ...apiStatus };
    try {
      const results = await ClientService.events();
      if (results.success) {
        prepareData(results);
      } else {
        newApiStatus.error = true;
        newApiStatus.message = results.message;
      }
    } catch (error) {
      newApiStatus.error = true;
      newApiStatus.message = error.message;
    }
    newApiStatus.loading = false;

    setApiStatus(newApiStatus);
  };

  const prepareData = (pageData) => {
    console.log(pageData);
    debugger;
    //TODO: connect to backend
    // setInvites(testInvites);
    // setUpcomingEvents(testEvents);
    // setPastEvents(testEvents);
  };

  const history = useHistory();

  const redirectToEventView = (event) => {
    let eventId = event.eventId;
    history.push(`/event/${eventId}`);
  };

  const redirectToEventEdit = (event) => {
    let eventId = event?.eventId;
    if (eventId) {
      history.push(`/event-edit/${eventId}`);
    } else {
      history.push(`/event-edit`);
    }
  };

  const leaveEvent = (event) => {
    //TODO: call backend to leave event;
    // On success, filterOutEvent(event);
  };

  const filterOutEvent = (departedEvent) => {
    let updatedUpcoming = upcomingEvents.filter(
      (event) => event !== departedEvent
    );
    let updatedPast = pastEvents.filter((event) => event !== departedEvent);
    setUpcomingEvents(updatedUpcoming);
    setPastEvents(updatedPast);
  };

  return (
    <div>
      <AppBar color={theme1} />
      {apiStatus.loading ? (
        <CenteredLoadingSpinner
          size={150}
          color={theme1}
          loading={apiStatus.loading}
        />
      ) : (
        <Stack gapSize={spacing64}>
          <InvitesSection {...{ invites, setInvites }} />
          <EventsSection
            isUpcoming={true}
            events={upcomingEvents}
            {...{ redirectToEventView, redirectToEventEdit, leaveEvent }}
          />
          {pastEvents.length > 0 && (
            <EventsSection
              isUpcoming={false}
              events={pastEvents}
              {...{ redirectToEventView, redirectToEventEdit, leaveEvent }}
            />
          )}
        </Stack>
      )}
      {apiStatus.error && (
        <Error fontSize={fontSize24}>
          {apiStatus.message || "An error occurred. Please try again later."}
        </Error>
      )}
    </div>
  );
};

export default Main;
