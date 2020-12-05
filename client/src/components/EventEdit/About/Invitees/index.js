import React, { useState } from "react";
import styled from "styled-components";
import AddInviteeModal from "./AddInviteeModal";
import InviteesList from "./InviteesList";
import PrimaryButton from "../../../Common/Buttons/PrimaryButton";
import { spacing16 } from "../../../../resources/style-constants";
import Error from "../../../Common/Error";

const inviteCollaborator =
  "Enter someone's email or username to invite them to collaborate on your event.";

const inviteAttendee =
  "Enter someone's email or username to invite them to your event.";

const noCollaborators =
  "No collaborators have been added. Click 'Add Person' to invite someone to help organize the event.";

const noInvitees =
  "No one has been invited yet. Click 'Add Person' to invite someone to your event.";

const AddButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: ${spacing16} 0;
`;

const Invitees = ({
  addPerson,
  isCollaborators = true,
  people,
  removePerson
}) => {
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setModalOpened(true);
  };

  const addInvitee = (person) => {
    addPerson(person);
    setModalOpened(false);
  };

  return (
    <div>
      <h1>{isCollaborators ? "Who's Collaborating?" : "Who's Invited?"}</h1>
      <InviteesList {...{ people, removePerson }} />
      {people.length === 0 && (
        <Error>{isCollaborators ? noCollaborators : noInvitees}</Error>
      )}
      <AddButtonWrapper>
        <PrimaryButton onClick={openModal}>Add Person</PrimaryButton>
      </AddButtonWrapper>

      <AddInviteeModal
        addPersonMessage={isCollaborators ? inviteCollaborator : inviteAttendee}
        addTitle={isCollaborators ? "Add Collaborator" : "Add Attendee"}
        {...{
          modalOpened,
          setModalOpened,
          addInvitee,
          addPerson: addInvitee
        }}
      />
    </div>
  );
};

export default Invitees;
