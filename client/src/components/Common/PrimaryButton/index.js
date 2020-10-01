import React from "react";
import styled from "styled-components";
import {theme1, theme2} from "../../../resources/style-constants"

const theme = {
  teal: {
    default: theme1,
    hover: theme2
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  padding: 5px 50px;
  font-weight: bold;
  border-radius: 7px;
  border-width: 0px;
  width: 40%;
  outline: 0;
  cursor: pointer;
  margin: 10px 0px;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

function clicked() {
  alert("Proceed to next page");
}

Button.defaultProps = {
  theme: "teal"
};

/** button is colored with the theme color */
const PrimaryButton = ({title}) => {
  return <Button onClick = {clicked}>{title}</Button>;
};
export default PrimaryButton;