import React from "react";
import styled from "styled-components";
import { spacing8 } from "../../../resources/style-constants";

const Wrapper = styled.div`
  padding: ${spacing8} 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Logo = (props) => {
  const logoPath = './cal-logo.svg';

  if (props.type === 'mark-only') {
    return (
      <Wrapper>
        <img src={logoPath} alt='Event Planner Logo' />
      </Wrapper>
    );
  } else if (props.type === 'mark-with-text') {
    return (
      <Wrapper>
        <img src={logoPath} alt='Event Planner Logo' />
        <h3>Event Planner</h3>
      </Wrapper>
    );
  }

  throw Error(`${props.type} is not a valid logo type.`);
};

export default Logo;
