import React from "react";
import styled from "styled-components";
import { spacing8 } from "../../../resources/style-constants";

const Wrapper = styled.div`
  padding: ${spacing8} 0;
  width: 100%;
`;

const StyledInput = styled.input`
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  padding: ${spacing8} 0;
`;

const Input = ({ fullWidth, type = "text", ...props }) => {
  return (
    <Wrapper fullWidth={fullWidth} {...props}>
      <StyledInput {...{ type, fullWidth, ...props }} />
    </Wrapper>
  );
};

export default Input;
