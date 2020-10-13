import React from "react";
import styled from "styled-components";
import { spacing64 } from "../../resources/style-constants";

import Invitation from './Invitation';
import ActionCard from './ActionCard';
import AddEventCard from './AddEventCard';

const Wrapper = styled.div`
  padding: ${spacing64};
`;

const Main = () => {
  return (
    <Wrapper>
      {/* <Invitation isUnopened={true}></Invitation>
      <ActionCard></ActionCard> */}
      <AddEventCard></AddEventCard>
    </Wrapper>
  );
};

export default Main;
