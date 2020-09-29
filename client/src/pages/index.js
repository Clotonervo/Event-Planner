import React from "react";
import Layout from "../components/Layout";
import Logo from '../components/Common/Logo';
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 8px 0;
  width: 2cm;
`;

const MainPage = () => {
  return (
    <Layout>
      <div>This will be the home page</div>
      <Wrapper>
        <Logo type={'mark-with-text'}></Logo>
      </Wrapper>
    </Layout>
  );
};

export default MainPage;
