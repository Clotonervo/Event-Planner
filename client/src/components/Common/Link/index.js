import React from "react";
import styled from "styled-components";
import { link, highlightedLink } from "../../../resources/style-constants";

const StyledLink = styled.a`
  text-decoration: none;
  color: ${link};

  &:hover {
    mouse: cursor;
    color: ${highlightedLink};
  }
`;

const Link = ({ url, children, ...props }) => {
  return (
    <StyledLink href={url} {...props}>
      {children}
    </StyledLink>
  );
};

export default Link;
