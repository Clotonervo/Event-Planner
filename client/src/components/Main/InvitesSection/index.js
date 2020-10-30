import React from "react";
import styled from "styled-components";
import Invites from "./Invites";
import { fontSize56 } from "../../../resources/style-constants";

const StyledH1 = styled.h1`
  font-size: ${fontSize56};
`;

const InvitesSection = ({ invites = [], setInvites }) => {
  const openInvite = (invite) => {
    let updatedInvites = [...invites];
    let inviteIndex = updatedInvites.findIndex((i) => i.id === invite.id);
    updatedInvites[inviteIndex].isUnopened = false;

    setInvites(updatedInvites);
  };

  return (
    <div>
      <StyledH1>Invites</StyledH1>
      <Invites {...{ invites, openInvite }} />
    </div>
  );
};

export default InvitesSection;
