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
  updateEvent,
  sortList
}) => {
  const addViewer = (person) => {
    if (!userAlreadyExists(viewers, person)) {
      let updatedViewers = [...viewers].concat(person);
      updatedViewers = sortList(updatedViewers);
      updateEvent({ ...event, viewers: updatedViewers });
    }
  };

  const addCollaborator = (person) => {
    if (!userAlreadyExists(collaborators, person)) {
      let updatedCollabs = [...collaborators].concat(person);
      updatedCollabs = sortList(updatedCollabs);
      updateEvent({ ...event, collaborators: updatedCollabs });
    }
  };

  const userAlreadyExists = (list, user) => {
    return list.some((person) => person.username === user.username);
  };

  const removeViewer = (person) => {
    let updatedViewers = [...viewers];
    updatedViewers = updatedViewers.filter(
      (p) => p.username !== person.username
    );
    updateEvent({ ...event, viewers: updatedViewers });
  };

  const removeCollaborator = (person) => {
    let updatedCollabs = [...collaborators];
    updatedCollabs = updatedCollabs.filter(
      (p) => p.username !== person.username
    );
    updateEvent({ ...event, collaborators: updatedCollabs });
  };

  const updateAddress = (updatedAddress) => {
    const updated = { ...location } || { address: "" };
    updated.address = updatedAddress;
    updateEvent({ ...event, location: updated });
  };

  const updateField = (name, value) => {
    const updated = { ...event };
    updated[name] = value;
    updateEvent(updated);
  };

  return (
    <Stack gapSize={spacing32}>
      <Description {...{ description, updateField }} />
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
