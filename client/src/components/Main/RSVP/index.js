import React from "react";
import PropTypes from "prop-types";
import { theme1, grey3, borderRadius } from "../../../resources/style-constants";
import SecondaryButton from "../../Common/Buttons/SecondaryButton/index.js";
import RSVPCard from "../RSVPCard/index.js"
import styled from "styled-components";

const accentTheme = {
  default: "blue",
  hover: theme1,
  disabled: grey3,
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 5px;
  |
`;




const RSVP = ({
  onClick,
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
    <div>
        <FormWrapper>
            <FormWrapper>
                Are you going?
            </FormWrapper>
            <FormWrapper >
                <SecondaryButton onClick={respondYes} theme={accentTheme} >
                    Yes
                </SecondaryButton>
            </FormWrapper>
            <FormWrapper>
                <SecondaryButton onClick={respondNo} >
                    No.
                </SecondaryButton>
            </FormWrapper>
        </FormWrapper>
    </div>
  );
};
export default RSVP;



