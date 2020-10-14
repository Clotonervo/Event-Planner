import React from "react";
import AppBar from "../Common/AppBar";
import Map from "../Common/Map";
import { eventPink } from "../../resources/style-constants";

const Main = () => {
  return (
    <div>
      <AppBar color={eventPink} />
      Page coming soon ...

      {/* TODO: Place map in correct place in page. */}
      <Map />

    </div>
  );
};

export default Main;
