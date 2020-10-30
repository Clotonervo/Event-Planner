import React, { useState } from "react";
import AddInviteeModal from "./Invitees/AddInviteeModal";

const inviteCollaborator =
  "Enter someone's email or username to invite them to collaborate on your event.";
const About = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };
  return (
    <div>
      <div onClick={openModal}>CLICK ME</div>
      <AddInviteeModal
        {...{ modalOpened, setModalOpened }}
        addPersonMessage={inviteCollaborator}
      />
    </div>
  );
};

export default About;
