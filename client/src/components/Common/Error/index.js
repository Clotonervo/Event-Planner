import React from "react";
import styled from "styled-components";
import { errorRed, fontSize16 } from "../../../resources/style-constants";

const StyledError = styled.p`
  color: ${errorRed};
  font-size: ${({ fontSize }) => fontSize};
`;

const Error = ({ fontSize = fontSize16, children }) => {
  return <StyledError {...{ fontSize }}>{children}</StyledError>;
};

export default Error;
