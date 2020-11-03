import React from "react";
import Description from "./Description";
import Invitees from "./Invitees";
import MapEditor from "./MapEditor";
import Stack from "../../Common/Stack";
import { spacing32 } from "../../../resources/style-constants";

const About = ({
  event: { collaborators, description, viewers },
  updateEvent
}) => {
  const addViewer = (person) => {};

  const addCollaborator = (person) => {};

  const removeViewer = (person) => {};

  const removeCollaborator = (person) => {};
  return (
    <Stack gapSize={spacing32}>
      <Description {...{ description, updateEvent }} />
      <MapEditor />
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
