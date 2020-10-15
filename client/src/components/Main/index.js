import React from "react";
import styled from "styled-components";
import { spacing64 } from "../../resources/style-constants";

import Invitation from './Invitation';
import ActionCard from './ActionCard';
import AddEventCard from './AddEventCard';
import EventCard from './EventCard';
import {theme1, theme2} from "../../resources/style-constants"

const Wrapper = styled.div`
  padding: ${spacing64};
`;

const Main = () => {
  return (
    <Wrapper>
      {/* <Invitation isUnopened={true}></Invitation>
      <ActionCard></ActionCard> */}
      <AddEventCard></AddEventCard>
      <EventCard color = "#ffab00" text = "fun fun party"></EventCard>
    </Wrapper>
  );
};

export default Main;
