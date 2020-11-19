import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { theme1 } from "../../resources/style-constants";
import ColorService from "../../services/ColorService";
import AppBar from "../Common/AppBar";
import Layout from "../Layout";
import Location from "./Location";

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
      <AppBar color={eventColor ?? theme1} />
      <Layout>
        Event View
        <Location
          address="Provo UT" 
        />
      </Layout>
    </div>
  );
};

export default EventView;
