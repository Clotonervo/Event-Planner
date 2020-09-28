import React from "react";
import Layout from "../components/Layout";
import Logo from '../components/Common/Logo';

const MainPage = () => {
  return (
    <Layout>
      <div>This will be the home page</div>
      <Logo type={'mark-with-text'}></Logo>
    </Layout>
  );
};

export default MainPage;
