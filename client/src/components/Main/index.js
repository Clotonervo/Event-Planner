import React from "react";
import AppBar from "../Common/AppBar";
import { eventPink } from "../../resources/style-constants";
import Invitee from "../../components/Main/Invitee/index.js";

const Main = () => {
  return (
    <div>
      <AppBar color={eventPink} />
      Page coming soon ...
      <p>
      </p>
      <Invitee text = "Barney" rsvpStatus = "declined"></Invitee>
      <Invitee text = "Ted" rsvpStatus = "accepted"></Invitee>
      <Invitee text = "Marshall" rsvpStatus = "pending"></Invitee>
    </div>
  );
};

export default Main;
