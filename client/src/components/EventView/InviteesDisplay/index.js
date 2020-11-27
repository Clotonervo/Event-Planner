import React from "react";
import styled from "styled-components";
import Invitee from "./Invitee";

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const InviteesDisplay = ({ viewers = [] }) => {
  return (
    <div>
      <h1>Who's Invited?</h1>
      <Grid>
        {viewers.length > 0 &&
          viewers.map((person, index) => {
            return <Invitee key={index} {...{ person, index }} />;
          })}
      </Grid>
    </div>
  );
};

export default InviteesDisplay;
