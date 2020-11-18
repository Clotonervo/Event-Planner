import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ServiceClient from "../../services";
import EventAppBar from "../EventView/Header/index.js";
import { eventPink, eventYellow } from "../../resources/style-constants";
//import Invitee from "../../components/Main/Invitee/index.js";
import CenteredLoadingSpinner from "../Common/CenteredLoadingSpinner";
import Error from "../Common/Error";
import EventsSection from "./EventsSection";
import InvitesSection from "./InvitesSection";
import Layout from "../Layout";
import PageAccess from "../Common/PageAccess";
import Stack from "../Common/Stack";
import { spacing64, fontSize24, theme1 } from "../../resources/style-constants";
import RSVPFloating from "../EventView/RSVPFloating/index.js";

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
    // eslint-disable-next-line
  }, []);

  const loadPageData = async () => {
    setApiStatus({ ...apiStatus, loading: true, error: false });
    const newApiStatus = { ...apiStatus };
    try {
      const results = await ServiceClient.events();
      //TODO: call endpoint for invites
      if (results.success) {
        prepareData(results.events);
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

  const prepareData = (pageData) => {
    let upcoming = pageData.filter((event) => !event.past);
    let past = pageData.filter((event) => event.past);
    setUpcomingEvents(upcoming);
    setPastEvents(past);

    //TODO: set invites from api data
    setInvites(testInvites);
  };

  const history = useHistory();

  const redirectToEventView = (event) => {
    let eventID = event.eventID;
    history.push(`/event?id=${eventID}`);
  };

  const redirectToEventEdit = (event) => {
    let eventID = event?.eventID;
    if (eventID) {
      history.push(`/event-edit?id=${eventID}`);
    } else {
      history.push(`/event-edit`);
    }
  };

  const leaveEvent = (event) => {
    //TODO: call backend to leave event;

    // On success, filterOutEvent(event);
    filterOutEvent(event);
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

      <PageAccess />
      <EventAppBar color={theme1} />
      <Layout>
        {apiStatus.loading ? (
          <CenteredLoadingSpinner
            size={150}
            color={theme1}
            loading={apiStatus.loading}
          />
        ) : (
          <Stack gapSize={spacing64}>
            {invites.length > 0 && (
              <InvitesSection {...{ invites, setInvites }} />
            )}
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
      </Layout>
    </div>
  );
};

export default Main;
