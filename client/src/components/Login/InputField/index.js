import React from "react";
import styled from "styled-components";

import Input from "../../Common/Input";
import Error from "../../Common/Error";
import { spacing8 } from "../../../resources/style-constants";

const PaddedLabel = styled.label`
  padding: ${spacing8} 0;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const InputField = ({
  label,
  changeHandler,
  validityState = {},
  children,
  validateInput,
  ...props
}) => {
  return (
    <InputWrapper>
      <PaddedLabel>{label}</PaddedLabel>
      <Input
        fullWidth
        onChange={changeHandler}
        onBlur={validateInput}
        {...{ ...props }}
        required
      />
      {children}
      {validityState.error && validityState.message && (
        <Error>{validityState.message}</Error>
      )}
    </InputWrapper>
  );
};

export default InputField;
