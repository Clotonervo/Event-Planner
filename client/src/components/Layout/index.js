import React from "react";
import styled from "styled-components";
import { spacing64 } from "../../resources/style-constants";

const Wrapper = styled.div`
  padding: ${spacing64};
`;

const Layout = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Layout;
