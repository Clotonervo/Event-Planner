import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";

import Input from "../Input";
import PrimaryButton from "../Buttons/PrimaryButton";
import { spacing32, spacing16 } from "../../../resources/style-constants";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

const IconContainer = styled.div`
  opacity: 0.5;
  transition: opacity 0.08s ease-in-out;
  cursor: pointer;
  transform: scale(0.75);

  :hover {
    opacity: 0.7;
  }
`;

const InputContainer = styled.div`
  height: 100%;
  width: calc(100% - ${spacing16});
  margin-right: ${spacing32};
`;

const InputField = styled.input`
  height: 100%;
  width: 100%;
`;

const InputEditable = ({
  name,
  value,
  placeholder,
  onChange,
  type = "text",
  required = false,
  onPressEdit,
  onPressSave,
  ...props
}) => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [editValue, setEditValue] = useState(value);

  const child = isEditMode ?
    <>
      <InputContainer>
        <InputField as={Input} {...{ name, value, placeholder, onChange, type, required, ...props }} />
      </InputContainer>
      <PrimaryButton onClick={onPressSave}>
        Save
      </PrimaryButton>
    </> :
    <>
      {value}
      <IconContainer onClick={onPressEdit}>
        <FiEdit2 />
      </IconContainer>
    </>

  return (
    <Container {...props}>
      {child}
      {/* <Input {...{ name, value, placeholder, onChange, type, required, ...props }} /> */}
    </Container>
  );
}

export default InputEditable;
