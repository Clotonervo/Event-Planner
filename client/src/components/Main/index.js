import React from "react";
import AppBar from "../Common/AppBar";
import { eventPink, eventYellow } from "../../resources/style-constants";
import Invitee from "../../components/Main/Invitee/index.js";
import RSVP from "../../components/Main/RSVP/index.js"
import RSVPFloating from "../../components/Main/RSVPFloating/index.js";

const Main = () => {
  return (
    <div>

        <RSVPFloating color={eventYellow} />

    </div>
  );
};

export default Main;