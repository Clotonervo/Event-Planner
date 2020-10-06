import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme1,
  theme2,
  grey2,
  spacing16,
  fontSize20,
  borderRadius
} from "../../../../resources/style-constants";

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.default};
  transition: ease background-color 250ms;
  padding: ${spacing16};
  border: 3px solid ${theme1};
  border-radius: ${borderRadius};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  cursor: pointer;
  font-weight: bold;
  font-size: ${fontSize20};
  color: black;

  &:hover {
    border: 3px solid ${({ theme }) => theme.hover};
    background-color: ${({ theme }) => theme.hover};
    box-shadow: 0 0 0 1px ${theme2};
  }

  &[disabled],
  &[disabled]:hover {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.disabled};
    color: ${grey2};
    box-shadow: none;
    border: 3px solid ${theme1};
    opacity: 0.7;
  }
`;

/** NOTE: don't use this directly, use the PrimaryButton or SecondaryButton */
const Button = ({
  onClick,
  fullWidth = false,
  disabled = false,
  theme,
  children,
  ...props
}) => {
  return (
    <StyledButton {...{ onClick, fullWidth, theme, disabled, ...props }}>
      {children}
    </StyledButton>
  );
};

export default Button;

Button.propTypes = {
  /** Whatever components will be rendered inside the button  */
  children: PropTypes.any,

  /** Whether or not the button should take up all of the alloted space */
  fullWidth: PropTypes.bool,

  /** Whether or not the button is disabled */
  disabled: PropTypes.bool,

  /** Method that is called when button is clicked*/
  onClick: PropTypes.func.isRequired,

  /** Object containing default and hover color for the button */
  theme: PropTypes.object
};
