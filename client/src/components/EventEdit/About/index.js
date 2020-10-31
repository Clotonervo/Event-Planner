import React from "react";
import Invitees from "./Invitees";

const About = ({ event: { viewers, collaborators } }) => {
  const addViewer = (person) => {};

  const addCollaborator = (person) => {};

  const removeViewer = (person) => {};

  const removeCollaborator = (person) => {};
  return (
    <div>
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
    </div>
  );
};

export default About;
