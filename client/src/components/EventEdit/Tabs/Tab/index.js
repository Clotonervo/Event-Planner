import React from "react";
import styled from "styled-components";
import {
  fontSize24,
  grey1,
  lightGrey1,
  link,
  spacing16,
  spacing128
} from "../../../../resources/style-constants";

const Wrapper = styled.div`
  border-bottom: 3px solid ${({ selected }) => (selected ? link : grey1)};
  color: ${({ selected }) => (selected ? link : grey1)};
  display: flex;
  flex-direction: row;
  font-size: ${fontSize24};
  justify-content: center;
  padding: ${spacing16};
  transition: ease background-color 250ms;
  width: ${spacing128};

  &:hover {
    cursor: pointer;
    background-color: ${lightGrey1};
  }
`;

const Text = styled.div``;

const Tab = ({ label, selected, switchView }) => {
  const handleClick = (event) => {
    event.preventDefault();
    switchView(label);
  };
  return (
    <Wrapper onClick={handleClick} {...{ selected }}>
      <Text> {label}</Text>
    </Wrapper>
  );
};

export default Tab;
