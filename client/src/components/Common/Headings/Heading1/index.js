import React from "react";
import styled from "styled-components";
import { fontSize64 } from "../../../../resources/style-constants";

const StyledH1 = styled.h1`
  font-size: ${fontSize64};
`;

const H1 = ({ children, ...props }) => {
  return <StyledH1 {...props}>{children}</StyledH1>;
};

export default H1;
