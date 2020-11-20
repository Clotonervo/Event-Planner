import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { theme1 } from "../../resources/style-constants";
import ColorService from "../../services/ColorService";
import AppBar from "../Common/AppBar";
import Layout from "../Layout";
import Description from "../../components/EventView/Description"

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


  return (
    <div>
      <AppBar color={eventColor ?? theme1}/>
      <Layout>Event View</Layout>
      <p></p>
      <Layout><Description description = "The funest party you will ever image. You will have such a blast. Come and have fun in the sun with everyone. Hello keep reading lots of word. Want to make it wrap around to demonstate. Maybe this will do it."></Description></Layout>
    </div>
  );
};

export default EventView;
