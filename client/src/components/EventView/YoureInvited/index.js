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

const StyledPrimary = styled(PrimaryButton)`
  width: 300px;
  margin-bottom: 8px;
`;

const StyledSecondary = styled(SecondaryButton)`
  width: 300px;
  margin-bottom: 8px;
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
            <StyledPrimary onClick={primaryOnClick}>{primaryText}</StyledPrimary>
            <StyledSecondary onClick={secondaryOnClick}>{secondaryText}</StyledSecondary>
        </Container>
    </div>
)
};
export default YoureInvited;