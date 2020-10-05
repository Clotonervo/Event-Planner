import React from "react";
import styled from "styled-components";
import { spacing8 } from "../../../resources/style-constants";

const Wrapper = styled.div`
  padding: ${spacing8} 0;
`;

const Input = () => {
  return (
    <Wrapper>
      <input type="text" />
    </Wrapper>
  );
};

export default Input;
