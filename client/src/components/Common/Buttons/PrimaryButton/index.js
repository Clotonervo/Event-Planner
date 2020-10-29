import React from "react";
import PropTypes from "prop-types";
import { theme1, theme2, lightBlue, grey3 } from "../../../../resources/style-constants";
import Button from "../Button";


const theme = {
  default: theme1,
  hover: theme2,
  disabled: theme1
};

const accent = {
    default: lightBlue,
    hover: theme1,
    disabled: grey3,
    borderRadius: 0
  };

const PrimaryButton = ({
  onClick,
  fullWidth,
  disabled = true,
  children,
  ...props
}) => {
  return (
    <Button {...{ fullWidth, theme, disabled, onClick, ...props }}>
      {children}
    </Button>
  );
};
export default PrimaryButton;

PrimaryButton.propTypes = {
  /** Whatever components will be rendered inside the button  */
  children: PropTypes.any,

  /** Whether or not the button should take up all of the alloted space */
  fullWidth: PropTypes.bool,

  /** Whether or not the button is disabled */
  disabled: PropTypes.bool,

  /** Method that is called when button is clicked*/
  onClick: PropTypes.func.isRequired
};
