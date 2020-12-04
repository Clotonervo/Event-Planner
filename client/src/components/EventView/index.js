import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { theme1 } from "../../resources/style-constants";
import ColorService from "../../services/ColorService";
import AppBar from "../Common/AppBar";
import Layout from "../Layout";
import YoureInvited from "./YoureInvited";
import Description from "../../components/EventView/Description";
import Location from "./Location";
import styled from "styled-components";
import InviteesDisplay from "./InviteesDisplay";
import ActionPrompt from "../Common/ActionPrompt";
import Stack from "../Common/Stack";
import Header from "./Header"
import {
  spacing32
} from "../../resources/style-constants";

const DisplayStle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7% 0%;
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

  const testEvent = {
    title: "Test Event",
    date: { startDate: "00000000000" }
  }

  return (
    <div>
      <AppBar color={eventColor ?? theme1} />
      <Header event={ testEvent } backgroundColor={eventColor}></Header>
      <Layout><Stack gapSize={spacing32}><DisplayStle>
        <ActionPrompt
         mainText = "Are you going?            "
         primaryText = "Yes"
         secondaryText = "NO"
        ></ActionPrompt></DisplayStle>
        <Description description="The funnest party you will ever image. You will have such a blast. Come and have fun in the sun with everyone. Hello keep reading lots of word. Want to make it wrap around to demonstate. Maybe this will do it."></Description>
        <Location address="Provo UT" />
        <InviteesDisplay></InviteesDisplay>
    <YoureInvited
      mainText="You're Invited Too!"
      supportingText="Are You Going?"
      primaryText="Yes!"
      primaryOnClick={invitedButtonClicked}
      secondaryText="No"
      secondaryOnClick={invitedButtonClicked}></YoureInvited>
      </Stack></Layout>
    </div>
  );
};

export default EventView;
