import React from "react";
import Layout from "../components/Layout";
import Logo from "../components/Common/Logo";
import { spacing8 } from "../resources/style-constants";
import styled from "styled-components";

// Temporary, feel free to delete me
const LogoWrapper = styled.div`
  padding: ${spacing8} 0;
  width: 2cm;
`;

const MainPage = () => {
  return (
    <Layout>
      {/* Temporary, feel free to delete me */}
      <LogoWrapper>
        <Logo type={"mark-with-text"}></Logo>
      </LogoWrapper>
    </Layout>
  );
};

export default MainPage;
