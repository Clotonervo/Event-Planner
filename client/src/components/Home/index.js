import React from "react";
import styled from "styled-components";
import { spacing64 } from "../../resources/style-constants";

import Invitation from './Invitation';

const Wrapper = styled.div`
  padding: ${spacing64};
`;

const Home = () => {
  return <Wrapper>
    <Invitation isUnopened={true}></Invitation>
  </Wrapper>;
};

export default Home;
