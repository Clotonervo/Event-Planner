import React from "react";

/** button is outlined in the theme color */
/* note: by default add ...props as the last argument.
This allows the component to be used as a styled-component.  */
const SecondaryButton = ({ text, ...props }) => {
  return <input type="button" value={text} {...props} />;
};

export default SecondaryButton;
