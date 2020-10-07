import React from "react";
import styled from "styled-components";

import H1 from "../../Common/Headings/Heading1";
import LoginForm from "../LoginForm";
import { spacing32, spacing64 } from "../../../resources/style-constants";

const SplitView = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`;

const Left = styled.div``;

const CenteredH1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RightContent = styled.div`
  width: 60%;
  padding: ${spacing64} 0;
`;

const WhiteSpace = styled.div`
  padding: ${spacing32};
`;

const LoginView = ({ updateAuthToken, switchView, redirectToHome }) => {
  return (
    <SplitView>
      <Left>
        <CenteredH1>
          <H1>Welcome Back!</H1>
        </CenteredH1>
      </Left>
      <Right>
        <RightContent>
          <LoginForm {...{ updateAuthToken, switchView, redirectToHome }} />
          <WhiteSpace />
        </RightContent>
      </Right>
    </SplitView>
  );
};

export default LoginView;
