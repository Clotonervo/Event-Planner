import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Invitation from "../Invitation";
import LinkButton from "../../../Common/LinkButton";
import { fontSize24, spacing24 } from "../../../../resources/style-constants";

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

const Invites = ({ invites = [], openInvite }) => {
  const [viewAll, setViewAll] = useState(false);
  const [visibleInvites, setVisibleInvites] = useState([]);

  useEffect(() => {
    setVisibleInvites(filterInvites(invites));
  }, [invites]);

  useEffect(() => {
    if (viewAll) {
      setVisibleInvites(invites);
    }
  }, [viewAll, invites]);

  const clickViewAll = () => {
    setViewAll(true);
  };

  return (
    <>
      {visibleInvites.length > 0 && (
        <Grid container direction="row" justify="flex-start" spacing={8}>
          {visibleInvites.map((invite, index) => {
            return (
              <Grid item key={index}>
                <Invitation {...{ invite }} onClick={openInvite} />
              </Grid>
            );
          })}
        </Grid>
      )}
      <ViewAllWrapper>
        {visibleInvites.length > 0 &&
          invites.length !== visibleInvites.length && (
            <LinkButton
              text="View All"
              onClick={clickViewAll}
              fontSize={fontSize24}
            />
          )}
      </ViewAllWrapper>
    </>
  );
};

export default Invites;
