import React from "react";
import PropTypes from "prop-types";
import { theme1, grey3 } from "../../../resources/style-constants";
import SecondaryButton from "../../Common/Buttons/SecondaryButton/index.js";
import RSVPCard from "../RSVPCard/index.js"

const theme = {
  default: "white",
  hover: theme1,
  disabled: grey3
};

const RSVP = ({
  onClick,
  align = "right",
  fullWidth,
  disabled,
  children,
  ...props
}) => {
  const respondYes = () => {
      // TODO: Respond Yes
  };
  const respondNo = () => {
      // TODO: Respond No
  }
  return (
    <div >
        <RSVPCard>
            Are you going?     
                <SecondaryButton onClick={respondYes}>
                    Yes
                </SecondaryButton>
                <SecondaryButton onClick={respondNo}>
                    No
                </SecondaryButton>
        </RSVPCard>
    </div>
  );
};
export default RSVP;



