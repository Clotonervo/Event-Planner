import React from "react";
import styled from "styled-components";

import Input from "../../Common/Input";
import { spacing8 } from "../../../resources/style-constants";

const PaddedLabel = styled.label`
  padding: ${spacing8} 0;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const InputField = ({ label, value, changeHandler, name, type, children }) => {
  return (
    <InputWrapper>
      <PaddedLabel>{label}</PaddedLabel>
      <Input
        fullWidth
        onChange={changeHandler}
        {...{ value, name, type }}
        required
      />
      {children}
    </InputWrapper>
  );
};

export default InputField;
