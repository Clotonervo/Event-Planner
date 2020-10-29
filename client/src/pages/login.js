import React from "react";
import styled from "styled-components";
import Login from "../components/Login";
import { spacing64 } from "../resources/style-constants";

const LayoutForLoginOnly = styled.div`
  padding: ${spacing64};
`;

const LoginPage = () => {
  return (
    <LayoutForLoginOnly>
      <Login />
    </LayoutForLoginOnly>
  );
};

export default LoginPage;
