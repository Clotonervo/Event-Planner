import React from "react";
import styled from "styled-components";
import { sideMargins, spacing64 } from "../../resources/style-constants";

const Wrapper = styled.div`
  padding: 0 ${sideMargins} ${spacing64} ${sideMargins};
`;

const Layout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
