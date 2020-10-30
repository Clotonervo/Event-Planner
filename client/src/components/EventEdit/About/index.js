import React, { useState } from "react";
import AddInviteeModal from "./Invitees/AddInviteeModal";

const inviteCollaborator =
  "Enter someone's email or username to invite them to collaborate on your event.";

const About = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const addInvitee = ({ name, username }) => {
    //TODO: add the person to the event
    setModalOpened(false);
  };

  return (
    <div>
      <div onClick={openModal}>Add Person</div>
      <AddInviteeModal
        {...{
          modalOpened,
          setModalOpened,
          addInvitee,
          addPerson: addInvitee,
          addPersonMessage: inviteCollaborator,
          addTitle: "Add Collaborator"
        }}
      />
    </div>
  );
};

export default About;
