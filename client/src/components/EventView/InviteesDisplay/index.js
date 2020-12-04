import React from "react";
import styled from "styled-components";
import Invitee from "./Invitee";
import { fontSize20 } from "../../../resources/style-constants";

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Text = styled.div`
  font-size: ${fontSize20};
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
      {viewers.length == 0 && (
        <Text>
          No one is currently invited to the event. If you are the event owner,
          go to the event edit page to start inviting people.
        </Text>
      )}
    </div>
  );
};

export default InviteesDisplay;
