import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Invitation from "../Invitation";
import LinkButton from "../../Common/LinkButton";
import {
  fontSize24,
  fontSize56,
  spacing24
} from "../../../resources/style-constants";

const StyledH1 = styled.h1`
  font-size: ${fontSize56};
`;

const ViewAllWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${spacing24};
`;

const invitesToShow = 6;

const filterInvites = (invites) => {
  return invites.length > invitesToShow
    ? invites.slice(0, invitesToShow)
    : invites;
};

const Invites = ({ invites = [] }) => {
  const [viewAll, setViewAll] = useState(false);
  const [visibleInvites, setVisibleInvites] = useState(filterInvites(invites));

  const openInvite = (invite) => {
    console.log(`openInvite ${invite.name}`);
  };

  useEffect(() => {
    if (viewAll) {
      setVisibleInvites(invites);
    }
  }, [viewAll, invites]);

  const clickViewAll = () => {
    setViewAll(true);
  };

  return (
    <div>
      <StyledH1>Invites</StyledH1>
      {visibleInvites.length > 0 && (
        <Grid container direction="row" justify="flex-start" spacing={10}>
          {visibleInvites.map((invite) => {
            return (
              <Grid item>
                <Invitation
                  invite={invite}
                  onClick={openInvite}
                  isUnopened={true}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      <ViewAllWrapper>
        {invites.length !== visibleInvites.length && (
          <LinkButton
            text="View All"
            onClick={clickViewAll}
            fontSize={fontSize24}
          />
        )}
      </ViewAllWrapper>
    </div>
  );
};

export default Invites;
