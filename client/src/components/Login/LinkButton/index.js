import React from "react";
import styled from "styled-components";
import { link, highlightedLink } from "../../../resources/style-constants";

const StyledLink = styled.div`
  text-decoration: none;
  color: ${link};

  &:hover {
    mouse: cursor;
    color: ${highlightedLink};
  }
`;

const LinkButton = ({ text, onClick, ...props }) => {
  return (
    <StyledLink onClick={onClick} {...props}>
      {text}
    </StyledLink>
  );
};

export default LinkButton;
