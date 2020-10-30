import React from "react";
import styled from "styled-components";
import { spacing64, sideMargins } from "../../resources/style-constants";

const Wrapper = styled.div`
  padding: ${spacing64} ${sideMargins};
`;

const Layout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
