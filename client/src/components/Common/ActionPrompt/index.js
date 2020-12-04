import React from "react";
import styled from "styled-components";
import Card from "../Card";
import PrimaryButton from "../Buttons/PrimaryButton";
import SecondaryButton from "../Buttons/SecondaryButton";
import {
  borderRadius,
  fontSize20,
  spacing16
} from "../../../resources/style-constants";

const StyledCard = styled(Card)`
  border-radius: ${borderRadius};
  box-sizing: border-box;
  padding: 1rem;
  z-index: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  font-size: ${fontSize20};
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
`;

const PaddedButton = styled.div`
  padding-right: ${spacing16};
`;

const ActionPrompt = ({
  mainText,
  primaryText,
  secondaryText,
  primaryOnClick,
  secondaryOnClick,
  ...props
}) => {
  return (
    <StyledCard {...props}>
      <Container>
        <Left>{mainText}</Left>
        <Right>
          <PaddedButton>
            <SecondaryButton onClick={() => secondaryOnClick && secondaryOnClick()}>
              {secondaryText}
            </SecondaryButton>
          </PaddedButton>

          <PrimaryButton onClick={() => primaryOnClick && primaryOnClick()}>{primaryText}</PrimaryButton>
        </Right>
      </Container>
    </StyledCard>
  );
};

export default ActionPrompt;
