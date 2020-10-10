import React from "react";
import styled from "styled-components";

import Card from "../../Common/Card";

import { borderRadius, spacing8 } from "../../../resources/style-constants";

const CardContainer = styled(Card)`
  height: 9vw;
  width: 15vw;
  padding: ${spacing8};
  border-radius: ${borderRadius};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.06), 0 6px 8px 0 rgba(0, 0, 0, 0.06);
  transition: transform 0.1s ease-in-out;
  transition: box-shadow 0.1s ease-in-out;
  transform: scale(1.0, 1.0);
  cursor: pointer;

  :hover {
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08), 0 6px 20px 0 rgba(0, 0, 0, 0.08);
    transform: scale(1.01, 1.01);
  }
`;

/**
 * Reusable card for the home page. Wrap your
 * component in an <ActionCard> to have consistent
 * hover, border-radius, size behaviour.
 */
const ActionCard = ({ children, ...props }) => {
  return (
    <CardContainer>
      {children}
    </CardContainer>
  );
};

export default ActionCard;
