import React, { useEffect, useState } from "react";
import AppBar from "../Common/AppBar";
import { eventPink } from "../../resources/style-constants";
import Invitee from "./Invitee/index.js";
import Map from "../Common/Map/index.js"
import styled from "styled-components";
import Button from "../Common/Buttons/SecondaryButton/index.js"
import RSVPFloating from "../EventView/RSVPFloating/index.js"
import ClientService from "../../services"
//import PageAccess from "../Common/PageAccess";


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

    useEffect(() => {
      loadPageData();
      // eslint-disable-next-line
    }, []);

  const loadPageData = async () => {
    setApiStatus({ ...apiStatus, loading: true, error: false });
    const newApiStatus = { ...apiStatus };
    try {
        let eventId = "12346"
      //const results = await ClientService.events();
      results = await ClientService.events(eventId);
      //TODO: call endpoint for invites
      if (results.success) {
        //prepareData(results.events);
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

//const Main = () => {
  return (
    <div>
      <AppBar color={eventPink} />
      <DisplayStle>
        <Heading>Description</Heading>
        <p>{results.events.eventName}</p>
        <RSVPFloating/>
        <Heading>Location</Heading>
        <Map></Map>
        <p></p>
        <Heading>Who's invited?</Heading>
        <InviteeRow>
            <Invitee name = "Cody" rsvpStatus = "accepted"></Invitee>
            <Invitee name = "Mookie" rsvpStatus = "pending"></Invitee>
            <Invitee name = "Clayton" rsvpStatus = "declined"></Invitee>
            <Invitee name = "Corey" rsvpStatus = "accepted"></Invitee>
            <Invitee name = "Kike" rsvpStatus = "declined"></Invitee>
        </InviteeRow>
        <InviteeRow>
            <Invitee name = "Dustin" rsvpStatus = "accepted"></Invitee>
            <Invitee name = "Blake" rsvpStatus = "pending"></Invitee>
            <Invitee name = "Will" rsvpStatus = "declined"></Invitee>
        </InviteeRow>
        <p></p><p></p>
        <CenterHeading>You're Invited Too!</CenterHeading>
        <CenterHeadingLight>Are You Going?</CenterHeadingLight>
        <Button>Yes!</Button>
        <p></p>
        <Button>No</Button>
      </DisplayStle>
    </div>
  );
};

export default Main;

// const EventView = () => {
//   return <div>Event View</div>;
// };

// export default EventView;
