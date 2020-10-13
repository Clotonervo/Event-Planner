import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 3;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Card = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Card;
