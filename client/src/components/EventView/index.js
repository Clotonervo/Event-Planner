import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { theme1 } from "../../resources/style-constants";
import ColorService from "../../services/ColorService";
import AppBar from "../Common/AppBar";
import Layout from "../Layout";
import YoureInvited from "./YoureInvited";

const EventView = () => {
  const [eventColor, setEventColor] = useState();

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let eventColor = ColorService.formatHex(params.get("color"));
    if (eventColor) {
      setEventColor(eventColor);
    }
  });

  const invitedButtonClicked = () => {
    console.log("button pressed");
  }

  return (
    <div>
      <AppBar color={eventColor ?? theme1}/>
      <Layout>Event View</Layout>
      <YoureInvited
      mainText="You're Invited Too!"
      supportingText="Are You Going?"
      primaryText="Yes!"
      primaryOnClick={invitedButtonClicked}
      secondaryText="No"
      secondaryOnClick={invitedButtonClicked}></YoureInvited>
    </div>
  );
};

export default EventView;
