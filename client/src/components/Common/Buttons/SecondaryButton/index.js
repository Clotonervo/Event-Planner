import React from "react";
import PropTypes from "prop-types";
import { theme1, grey3 } from "../../../../resources/style-constants";
import Button from "../Button";

const theme = {
  default: "white",
  hover: theme1,
  disabled: grey3
};

const SecondaryButton = ({
  onClick,
  fullWidth,
  disabled,
  children,
  ...props
}) => {
  return (
    <Button {...{ fullWidth, theme, onClick, disabled, ...props }}>
      {children}
    </Button>
  );
};
export default SecondaryButton;

SecondaryButton.propTypes = {
  /** Whatever components will be rendered inside the button  */
  children: PropTypes.any,

  /** Whether or not the button should take up all of the alloted space */
  fullWidth: PropTypes.bool,

  /** Whether or not the button is disabled */
  disabled: PropTypes.bool,

  /** Method that is called when button is clicked*/
  onClick: PropTypes.func.isRequired
};
