import React, { useEffect, useState } from "react";
import AppBar from "../Common/AppBar";
import Layout from "../Layout";
import Header from "../EventView/Header/index.js";
import { createDefaultEvent } from "../EventEdit/defaultEvent.js";
import ServiceClient from "../../services";

const defaultEvent = createDefaultEvent();

const EventView = () => {
  const [event, setEvent] = useState(defaultEvent);
  return (
    <div>
      <AppBar />
      <Header event = {event}/>
      <Layout>Event View</Layout>
    </div>
  );
};

export default EventView;
