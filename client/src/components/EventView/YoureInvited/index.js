import React from "react";
import styled from "styled-components";
import PrimaryButton from "../../Common/Buttons/PrimaryButton";
import SecondaryButton from "../../Common/Buttons/SecondaryButton";
import {
    borderRadius,
    fontSize20,
    spacing16
  } from "../../../resources/style-constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const CondensedMainHeader = styled.h1`
  margin-block-end: .2em;
`;

const CondensedSecondaryHeader = styled.h3`
  margin-block-start: .1em;
`;

const ButtonWidth = styled.div`
  width: 100%;
  height: 0;
`;

const YoureInvited = ({
    mainText,
    supportingText,
    primaryText,
    secondaryText,
    primaryOnClick,
    secondaryOnClick,
    ...props
  }) => {
return (
    <div>
        <Container>
            <CondensedMainHeader>{mainText}</CondensedMainHeader>
            <CondensedSecondaryHeader>{supportingText}</CondensedSecondaryHeader>
          <PrimaryButton onClick={primaryOnClick} fullWidth>{primaryText}</PrimaryButton>
          <SecondaryButton onClick={secondaryOnClick} fullWidth>{secondaryText}</SecondaryButton>
      </Container>
    </div>
)
};
export default YoureInvited;