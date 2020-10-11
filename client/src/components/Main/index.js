import React from "react";
import styled from "styled-components";
import { spacing64 } from "../../resources/style-constants";

import Invitation from './Invitation';
import ActionCard from './ActionCard';

const Wrapper = styled.div`
  padding: ${spacing64};
`;

const Main = () => {
  return (
    <Wrapper>
      <Invitation isUnopened={true}></Invitation>
      <ActionCard></ActionCard>
    </Wrapper>
  );
};

export default Main;
