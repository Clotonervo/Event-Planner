import React from "react";
import AppBar from "../Common/AppBar";
import { eventPink } from "../../resources/style-constants";
import InviteeListItem from "../../components/Main/InviteeListItem/index.js";

function clicked(){
    alert("you clicked me");
}

const Main = () => {
  return (
    <div>
      <AppBar color={eventPink} />
      Page coming soon ...
      <p></p>
      <InviteeListItem onDelete = {clicked} name = "Justin A. Miller"></InviteeListItem>
      <InviteeListItem onDelete = {clicked} name = "Short Name"></InviteeListItem>
      <InviteeListItem onDelete = {clicked} name = "Veeeeerryyyyy Loooong Nameeeeeeee"></InviteeListItem>
    </div>
  );
};

export default Main;