import React from "react";
import styled from "styled-components";
import PrimaryButton from "../../Common/Buttons/PrimaryButton";
import SecondaryButton from "../../Common/Buttons/SecondaryButton";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CondensedMainHeader = styled.h1`
  margin-block-end: .2em;
`;

const CondensedSecondaryHeader = styled.h3`
  margin-block-start: .1em;
  font-weight: normal;
`;

// I don't think we want to do it this way, I just wasn't aware of how it would be all built out afterwards.
// This can be easily changed if need be.
const ButtonWidth = styled.div`
  width: 30%;
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
            <ButtonWidth>
              <PrimaryButton onClick={primaryOnClick} fullWidth>{primaryText}</PrimaryButton>
              <SecondaryButton onClick={secondaryOnClick} fullWidth>{secondaryText}</SecondaryButton>
            </ButtonWidth>
        </Container>
    </div>
)
};
export default YoureInvited;