import React from "react";
import styled from "styled-components";

import H1 from "../../Common/Headings/Heading1";
import SignUpForm from "../SignUpForm";
import { spacing32, spacing64 } from "../../../resources/style-constants";

const SplitView = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeftContent = styled.div`
  width: 60%;
  padding: ${spacing64} 0;
`;

const Right = styled.div``;

const CenteredH1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const WhiteSpace = styled.div`
  padding: ${spacing32};
`;

const SignUpView = ({ setIsLogin }) => {
  return (
    <SplitView>
      <Left>
        <LeftContent>
          <SignUpForm {...{ setIsLogin }} />
          <WhiteSpace />
        </LeftContent>
      </Left>
      <Right>
        <CenteredH1>
          <H1>Hello!</H1>
        </CenteredH1>
      </Right>
    </SplitView>
  );
};

export default SignUpView;
