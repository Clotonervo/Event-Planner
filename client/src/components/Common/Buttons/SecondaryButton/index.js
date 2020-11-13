import React from "react";
import PropTypes from "prop-types";
import {
  lightGrey1,
  lightGrey2,
  link,
  theme1
} from "../../../../resources/style-constants";
import Button from "../Button";

const theme = {
  backgroundColor: "white",
  border: theme1,
  disabled: lightGrey2,
  hover: lightGrey1,
  hoverBorder: theme1,
  textColor: theme1
};

const accent = {
  backgroundColor: "white",
  border: link,
  disabled: lightGrey2,
  hover: lightGrey1,
  hoverBorder: link,
  textColor: link
};

const SecondaryButton = ({
  onClick,
  fullWidth,
  disabled = false,
  type = "accent",
  children,
  ...props
}) => {
  return (
    <Button
      theme={type === "accent" ? accent : theme}
      {...{ fullWidth, onClick, disabled, ...props }}
    >
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

  /** The type of color palette to be rendered.   */
  type: PropTypes.oneOf(["accent", "theme"]),

  /** Method that is called when button is clicked*/
  onClick: PropTypes.func.isRequired
};
