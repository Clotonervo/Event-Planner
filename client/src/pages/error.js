import React from "react";
import Layout from "../components/Layout";
import AppBar from "../components/Common/AppBar";

const ErrorPage = () => {
  return (
    <>
      <AppBar />
      <Layout>
        <h2>404 Not Found</h2>
      </Layout>
    </>
  );
};

export default ErrorPage;
