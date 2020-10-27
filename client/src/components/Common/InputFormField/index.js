import React from "react";
import styled from "styled-components";

import Input from "../Input";
import Error from "../Error";

const PaddedLabel = styled.label`
  font-weight: bold;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const InputFormField = ({
  name,
  value,
  placeholder,
  label,
  changeHandler,
  validityState = {},
  validateInput,
  children,
  required,
  ...props
}) => {
  return (
    <InputWrapper>
      <PaddedLabel>{label}</PaddedLabel>
      <Input
        onChange={changeHandler}
        onBlur={validateInput}
        {...{ name, value, placeholder, required, ...props }}
      />
      {children}
      {validityState.error && validityState.message && (
        <Error>{validityState.message}</Error>
      )}
    </InputWrapper>
  );
};

export default InputFormField;
