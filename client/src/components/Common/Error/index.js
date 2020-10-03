import React from "react";
import styled from "styled-components";
import { errorRed } from "../../../resources/style-constants";

const StyledError = styled.p`
  color: ${errorRed};
`;

const Error = ({ children }) => {
  return <StyledError>{children}</StyledError>;
};

export default Error;
