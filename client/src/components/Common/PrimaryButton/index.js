import React from "react";
import styled from "styled-components";
import { spacing8, fontSize16 } from "../../../resources/style-constants";

const StyledButton = styled.button`
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  padding: ${spacing8};
  font-weight: bold;
  font-size: ${fontSize16};
`;

/** button is colored with the theme color */
const PrimaryButton = ({ children, onClick, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default PrimaryButton;
