import React from "react";
import styled from "styled-components";

import Card from "../../Common/Card";

import { borderRadius } from "../../../resources/style-constants";

const CardContainer = styled(Card)`
  height: 75px;
  width: 390px;
  border-radius: ${borderRadius};
  transition: transform 0.08s ease-in-out;
  transition: box-shadow 0.08s ease-in-out;
  transform: scale(1.0, 1.0);
  cursor: pointer;

  // TODO: Define shadow constants in style-constants.js and replace this.
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.06), 0 6px 8px 0 rgba(0, 0, 0, 0.06);

  :hover {
    transform: scale(1.01, 1.01);
    
    // TODO: Define shadow constants in style-constants.js and replace this.
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08), 0 6px 20px 0 rgba(0, 0, 0, 0.08);
  }

  :active {
    // TODO: Define shadow constants in style-constants.js and replace this.
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.06), 0 6px 8px 0 rgba(0, 0, 0, 0.06);
  }
`;

/**
 * Reusable card for the home page. Wrap your
 * component in an <ActionCard> to have consistent
 * hover, border-radius, size behaviour.
 */
const RSVPCard = ({ children, ...props }) => {
  return (
    <CardContainer {...{ ...props }}>
      {children}
    </CardContainer>
  );
};

export default RSVPCard;