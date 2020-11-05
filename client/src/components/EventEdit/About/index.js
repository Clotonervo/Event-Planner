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
  setEvent,
  sortList
}) => {
  const addViewer = (person) => {
    let updatedViewers = [...viewers].concat(person);
    updatedViewers = sortList(updatedViewers);
    setEvent({ ...event, viewers: updatedViewers });
  };

  const addCollaborator = (person) => {
    let updatedCollabs = [...collaborators].concat(person);
    updatedCollabs = sortList(updatedCollabs);
    setEvent({ ...event, collaborators: updatedCollabs });
  };

  const removeViewer = (person) => {
    let updatedViewers = [...viewers];
    updatedViewers = updatedViewers.filter(
      (p) => p.username !== person.username
    );
    setEvent({ ...event, viewers: updatedViewers });
  };

  const removeCollaborator = (person) => {
    let updatedCollabs = [...collaborators];
    updatedCollabs = updatedCollabs.filter(
      (p) => p.username !== person.username
    );
    setEvent({ ...event, collaborators: updatedCollabs });
  };

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
        addPerson={addViewer}
        isCollaborators={false}
        people={viewers}
        removePerson={removeViewer}
      />
      <Invitees
        addPerson={addCollaborator}
        people={collaborators}
        removePerson={removeCollaborator}
      />
    </Stack>
  );
};

export default About;
