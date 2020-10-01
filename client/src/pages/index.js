import React from "react";
import Layout from "../components/Layout";
import PrimaryButton from "../components/Common/PrimaryButton"

const MainPage = () => {
  return (
    <Layout>
      <div>This will be the home page</div>
      <PrimaryButton title = "SIGN IN"></PrimaryButton>
    </Layout>
  );
};

export default MainPage;
