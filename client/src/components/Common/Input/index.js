import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  spacing8,
  spacing24,
  fontSize20,
  borderRadius,
  grey1,
  grey3,
  theme1
} from "../../../resources/style-constants";

const StyledInput = styled.input`
  background-color: white;
  box-sizing: border-box;
  padding: ${spacing24};
  height: ${fontSize20};
  width: 100%;
  border: 1px solid ${grey1};
  border-radius: ${borderRadius};
  font-size: ${fontSize20};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme1};
  }
  ::placeholder {
    color: ${grey3};
  }
`;

const Input = ({
  name,
  value,
  placeholder,
  onChange,
  type = "text",
  required = false,
  ...props
}) => {
  return (
    <StyledInput
      {...{ name, value, placeholder, onChange, type, required, ...props }}
    />
  );
};

export default Input;

Input.propTypes = {
  name: PropTypes.string,

  placeholder: PropTypes.string,

  /** Input is required */
  required: PropTypes.bool,

  value: PropTypes.string.isRequired,

  /** Method that is called when the value is changed */
  onChange: PropTypes.func.isRequired,

  /** Method that is called when the input is no longer focused */
  onBlur: PropTypes.func,

  /** A string representing the type of input to render */
  type: PropTypes.oneOf([
    "color",
    "date",
    "datetime-local",
    "email",
    "hidden",
    "month",
    "number",
    "password",
    "search",
    "tel",
    "text",
    "time",
    "url",
    "week"
  ])
};
