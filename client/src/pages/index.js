import React from "react";
import Layout from "../components/Layout";
import PrimaryButton from "../components/Common/PrimaryButton"

function login() {
  alert("Logging you in...");
}

const MainPage = () => {
  return (
    <Layout>
      <div>This will be the home page</div>
      <PrimaryButton 
        title = "SIGN IN" 
        onClick = {login}
        width = '40%'>
      </PrimaryButton>
    </Layout>
  );
};

export default MainPage;
