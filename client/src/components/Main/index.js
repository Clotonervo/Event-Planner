import React from "react";
import AppBar from "../Common/AppBar";
import { eventPink } from "../../resources/style-constants";
import MapEditor from "../../components/Common/MapEditor";

const Main = () => {
  return (
    <div>
      <AppBar color={eventPink} />
      Page coming soon ...
      <MapEditor label={"Address"}/>
    </div>
  );
};

export default Main;