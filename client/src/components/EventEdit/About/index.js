import React from "react";
import Description from "./Description";
import Invitees from "./Invitees";
import MapEditor from "./MapEditor";
import Stack from "../../Common/Stack";
import { spacing32 } from "../../../resources/style-constants";

const About = ({
  event,
  event: {
    collaborators,
    description,
    location = { address: "Provo, UT 84602" },
    location: { address },
    viewers
  },
  setEvent
}) => {
  const addViewer = (person) => {};

  const addCollaborator = (person) => {};

  const removeViewer = (person) => {};

  const removeCollaborator = (person) => {};

  const updateAddress = (updatedAddress) => {
    const updated = { ...location } || { address: "" };
    updated.address = updatedAddress;
    setEvent({ ...event, location: updated });
  };

  const updateEvent = (name, value) => {
    const updated = { ...event };
    updated[name] = value;
    setEvent(updated);
  };

  return (
    <Stack gapSize={spacing32}>
      <Description {...{ description, updateEvent }} />
      <MapEditor
        label="Event Location"
        onAddressChanged={updateAddress}
        address={address}
      />
      <Invitees
        {...{
          addPerson: addViewer,
          isCollaborators: false,
          people: viewers,
          removePerson: removeViewer
        }}
      />
      <Invitees
        {...{
          addPerson: addCollaborator,
          people: collaborators,
          removePerson: removeCollaborator
        }}
      />
    </Stack>
  );
};

export default About;
