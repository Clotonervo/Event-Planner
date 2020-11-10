import React, { useEffect, useState } from "react";
import AppBar from "../Common/AppBar";
import { eventPink, theme1, spacing64, fontSize24 } from "../../resources/style-constants";
import Invitee from "./Invitee/index.js";
import Map from "../Common/Map/index.js"
import styled from "styled-components";
import Button from "../Common/Buttons/SecondaryButton/index.js";
import RSVPFloating from "../EventView/RSVPFloating/index.js";
import ClientService from "../../services";
import CenteredLoadingSpinner from "../Common/CenteredLoadingSpinner";
import Stack from "../Common/Stack";
import Error from "../Common/Error";
//import PageAccess from "../Common/PageAccess";

// const testEvent = {
//     eventID: "testID",

// }

const CenterHeading = styled.p`
    font-size: calc(10px + 2vmin);
    color: black;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const CenterHeadingLight = styled.p`
    font-size: calc(7px + 2vmin);
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Heading = styled.p`
    font-size: calc(10px + 2vmin);
    color: black;
    font-weight: bold;
`;

const DisplayStle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    width: 70%;
    height: 100%;
    padding: 10% 15%;
`;

const InviteeRow = styled.div`
  display: flex;
  flex-direction: row;
  //align-items: center;
  align-items:flex-start;
  //justify-content: space-around;
`;

const Main = () => {
  const [apiStatus, setApiStatus] = useState({
    loading: false,
    error: false,
    message: false
  });

    const [event, setEvent] = useState({
        eventName: "testName"

    });
    useEffect(() => {
      loadPageData();
      // eslint-disable-next-line
    }, []);

    //not sure how to implement this
    // useEffect(() => {
    //     const params = new URLSearchParams(event.location.search);
    //     let eventId = params.get("id");
    //     if (eventId) {
    //     loadPageData(eventId);
    //     } else {
    //     //redirect to home page since there isn't an eventId
    //     }
    //     // eslint-disable-next-line
    //     }, [location.search]);
    //please help Morgan!!

  const loadPageData = async () => {
    setApiStatus({ ...apiStatus, loading: true, error: false });
    const newApiStatus = { ...apiStatus };
    try {
        let eventId = "12346"
      //const results = await ClientService.events();
      const results = await ClientService.event(eventId);
      //TODO: call endpoint for invites
      if (results.success) {
        //prepareData(results.events);
        
        setEvent(results.event);
      } else {
        // default message just in case
        
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

//const Main = () => {
  return (
    <div>
      <AppBar color={eventPink} name = {event.eventName} date = {event.date}>
      </AppBar>
      <div>
      {apiStatus.loading ? (
        <CenteredLoadingSpinner
          size={150}
          color={theme1}
          loading={apiStatus.loading}
        />
      ) : (
        <Stack gapSize={spacing64}>
          <DisplayStle>
        <Heading>Description</Heading>
        <p>{event.eventName}</p>
        <RSVPFloating/>
        <Heading>Location</Heading>
        <Map>{event.location}</Map>
        <p></p>
        <Heading>Who's invited?</Heading>
        <InviteeRow>
            <Invitee name = {event.viewers} rsvpStatus = "accepted"></Invitee>
            <Invitee name = {event.viewers} rsvpStatus = "pending"></Invitee>
            <Invitee name = {event.viewers} rsvpStatus = "declined"></Invitee>
            <Invitee name = {event.viewers} rsvpStatus = "accepted"></Invitee>
            <Invitee name = {event.viewers} rsvpStatus = "declined"></Invitee>
        </InviteeRow>
        <p></p><p></p>
        <CenterHeading>You're Invited Too!</CenterHeading>
        <CenterHeadingLight>Are You Going?</CenterHeadingLight>
        <Button>Yes!</Button>
        <p></p>
        <Button>No</Button>
      </DisplayStle>
        </Stack>
      )}
      {apiStatus.error && (
        <Error fontSize={fontSize24}>
          {apiStatus.message || "An error occurred. Please try again later."}
        </Error>
      )}
      </div>
      
    </div>
  );
};

export default Main;

// const EventView = () => {
//   return <div>Event View</div>;
// };

// export default EventView;
