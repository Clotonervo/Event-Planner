/* Imports always go at the top.
 * Always include import React from "react".
 * Any hooks you import go inside of {} */
import React, { useState } from "react";
import styled from "styled-components";

/* Imports from within our app, should go below third party imports */
import Card from "../Common/Card";
import Logo from "../Common/Logo";
import LoginView from "./LoginView";
import SignUpView from "./SignUpView";

/* style-constants has multiple exported items, you have to destructure it using {} */
import { theme1 } from "../../resources/style-constants";

// const slide = keyframes`
//   from {
//     transform
//   }
// `;

/* Styled constants go outside of the main function component */
const ColorOverlay = styled.div`
  position: fixed;
  height: 100%;
  width: 40%;
  top: 0;
  background-color: ${theme1};
  z-index: -1;
  left: 0;
`;

const StyledCard = styled(Card)`
  height: 70%;
`;

const LogoWrapper = styled.div`
  width: 40%;
  max-width: 200px;
`;

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  /* Variables, hooks, methods go inside the component  */

  /* The return is what's is actually being rendered */
  return (
    <div>
      <ColorOverlay {...{ isLogin }} />
      <StyledCard>
        <LogoWrapper>
          <Logo type="mark-with-text" />
        </LogoWrapper>
        {isLogin ? (
          <LoginView {...{ setIsLogin }} />
        ) : (
          <SignUpView {...{ setIsLogin }} />
        )}
      </StyledCard>
    </div>
  );
};

/* In order to use the component, you have to export it.
 * the keyword default says that there is only one thing being exported.
 * (see resources/style-constants for exporting multiple items)
 */
export default Login;
