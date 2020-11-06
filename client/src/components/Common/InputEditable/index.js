import React, { useState } from "react";
import styled from "styled-components";
import { FiEdit2, FiCheck } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";

import { spacing32, spacing16 } from "../../../resources/style-constants";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
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

const TextContainer = styled.div`
  height: 100%;
  width: calc(100% - ${spacing16});
  margin-right: ${spacing32};
`;

const InputField = styled.input`
  height: 100%;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;

  :focus {
    border: none;
    outline: none;
  }
`;

const InputEditable = ({
  name,
  value,
  placeholder,
  type = "text",
  required = false,
  onSaveValue,
  ...props
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const child = isEditMode ?
    <>
      <TextContainer>
        <InputField 
          onChange={(e) => {
            setEditValue(e.target.value);
          }}
          autoFocus
          {...{ name, editValue, placeholder, type, required, ...props }}
        />
      </TextContainer>
      <IconContainer onClick={() => {
        setIsEditMode(false);
      }}>
        <VscClose />
      </IconContainer>
      <IconContainer onClick={() => {
        onSaveValue && onSaveValue(editValue);
        setIsEditMode(false);
      }}>
        <FiCheck />
      </IconContainer>
    </> :
    <>
      <TextContainer>
        {value}
      </TextContainer>
      <IconContainer onClick={() => setIsEditMode(true)}>
        <FiEdit2 />
      </IconContainer>
    </>

  return (
    <Container {...props}>
      {child}
    </Container>
  );
}

export default InputEditable;
