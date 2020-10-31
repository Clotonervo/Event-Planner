import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { IconContext } from "react-icons";

import {
  spacing8,
  spacing16,
  spacing48,
  highlightedLink
} from "../../../resources/style-constants";

const Container = styled.div`
  height: ${spacing48};
  width: ${spacing48};
  border-radius: 50%;
  background-color: white;
  transition: box-shadow 0.08s ease-in-out;
  cursor: pointer;

  // TODO: Define shadow constants in style-constants.js and replace this.
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.06), 0 6px 8px 0 rgba(0, 0, 0, 0.06);
  
  :hover {
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08), 0 6px 20px 0 rgba(0, 0, 0, 0.08);
  }

  :active {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.06), 0 6px 8px 0 rgba(0, 0, 0, 0.06);
  }
`;

const Icon = styled.div`
  height: calc(100% - ${spacing16});
  width: calc(100% - ${spacing16});
  padding: ${spacing8};
  outline: hidden;
  user-drag: none;
  user-select: none;
`;

const IconButton = ({
  children,
  onPressed,
}) => {
  return (
    <Container onClick={onPressed}>
      <IconContext.Provider value={{ 
        color: highlightedLink, 
        size: `calc(${spacing48} - ${spacing16}`, }}
      >
        <Icon>
          {children}
        </Icon>
      </IconContext.Provider>
    </Container>
  );
}

IconButton.propTypes = {
  /** The icon. */
  children: PropTypes.any,

  /** A callback raised when the user presses this button. */
  onPressed: PropTypes.bool,
};


export default IconButton;
