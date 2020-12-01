import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { theme1 } from "../../resources/style-constants";
import ColorService from "../../services/ColorService";
import AppBar from "../Common/AppBar";
import Layout from "../Layout";
import YoureInvited from "./YoureInvited";
import Description from "../../components/EventView/Description";
import Location from "./Location";
import RSVPFloating from "../EventView/RSVPFloating/index.js";
import styled from "styled-components";
import Invitee from "./InviteesDisplay/Invitee/index.js";

const DisplayStle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7% 0%;
`;

const ExtraPadding = styled.div`
    padding: 4% 0%;
`;

const InviteeRow = styled.div`
  display: flex;
  flex-direction: row;
  //align-items: center;
  align-items:flex-start;
  //justify-content: space-around;
`;

const EventView = () => {
  const [eventColor, setEventColor] = useState();

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let eventColor = ColorService.formatHex(params.get("color"));
    if (eventColor) {
      setEventColor(eventColor);
    }
  }, [location.search]);

  const invitedButtonClicked = () => {
    console.log("button pressed");
  }

  return (
    <div>
      <AppBar color={eventColor ?? theme1} />
      <Layout><DisplayStle>
        <RSVPFloating></RSVPFloating></DisplayStle>
        <Description description="The funest party you will ever image. You will have such a blast. Come and have fun in the sun with everyone. Hello keep reading lots of word. Want to make it wrap around to demonstate. Maybe this will do it."></Description>
        <ExtraPadding></ExtraPadding>
        <Location address="Provo UT" />
        <ExtraPadding></ExtraPadding>
        <h1>Who's invited?</h1>
        <InviteeRow>
            Invitee Components will go here, but they need a person object or something, so I don't think I can hard code them
        </InviteeRow>
       </Layout>
       <ExtraPadding></ExtraPadding>
    <YoureInvited
      mainText="You're Invited Too!"
      supportingText="Are You Going?"
      primaryText="Yes!"
      primaryOnClick={invitedButtonClicked}
      secondaryText="No"
      secondaryOnClick={invitedButtonClicked}></YoureInvited>
      <ExtraPadding></ExtraPadding>
    </div>
  );
};

export default EventView;
