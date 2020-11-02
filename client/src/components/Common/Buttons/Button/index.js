import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  grey2,
  spacing16,
  fontSize20,
  borderRadius
} from "../../../../resources/style-constants";

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.backgroundColor};
  transition: ease background-color 250ms;
  padding: ${spacing16};
  border: 3px solid ${({ theme }) => theme.border};
  border-radius: ${borderRadius};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  cursor: pointer;
  font-weight: bold;
  font-size: ${fontSize20};
  color: ${({ theme }) => theme.textColor};

  &:hover {
    border: 3px solid
      ${({ theme }) => (theme.hoverBorder ? theme.hoverBorder : theme.hover)};
    background-color: ${({ theme }) => theme.hover};
  }

  &[disabled],
  &[disabled]:hover {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.disabled};
    box-shadow: none;
    border: 3px solid ${({ theme }) => (theme.border ? theme.border : "")};
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
