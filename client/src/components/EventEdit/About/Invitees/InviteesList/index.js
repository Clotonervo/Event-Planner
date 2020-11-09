import React from "react";
import styled from "styled-components";
import InviteeListItem from "../InviteeListItem";

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const InviteesList = ({ removePerson, people = [] }) => {
  return (
    <List>
      {people.map((person, index) => {
        return (
          <InviteeListItem
            key={index}
            {...{ onDelete: { removePerson }, person }}
          />
        );
      })}
    </List>
  );
};

export default InviteesList;
