import React from "react";
import PropTypes from "prop-types";
import {
  highlightedLink,
  link,
  theme1,
  theme2
} from "../../../../resources/style-constants";
import Button from "../Button";

const theme = {
  backgroundColor: theme1,
  border: theme1,
  disabled: theme1,
  hover: theme2,
  textColor: "black"
};

const accent = {
  backgroundColor: link,
  border: link,
  disabled: link,
  hover: highlightedLink,
  textColor: "white"
};

const PrimaryButton = ({
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
      {...{ fullWidth, disabled, onClick, ...props }}
    >
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

  /** The type of color palette to be rendered.   */
  type: PropTypes.oneOf(["accent", "theme"]),

  /** Method that is called when button is clicked*/
  onClick: PropTypes.func.isRequired
};
