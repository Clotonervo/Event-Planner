import React from "react";
import styled from "styled-components";
import {
  link,
  highlightedLink,
  spacing16
} from "../../../resources/style-constants";

const StyledLink = styled.div`
  text-decoration: none;
  color: ${link};
  font-size: ${({ fontSize }) => fontSize};

  &:hover {
    cursor: pointer;
    color: ${highlightedLink};
  }
  transition: 0.3s;
`;

const LinkButton = ({ text, onClick, fontSize = spacing16, ...props }) => {
  return (
    <StyledLink onClick={onClick} {...{ fontSize, ...props }}>
      {text}
    </StyledLink>
  );
};

export default LinkButton;
