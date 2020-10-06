/* Imports always go at the top.
 * Always include import React from "react".
 * Any hooks you import go inside of {} */
import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
/* Imports from within our app, should go below third party imports */
import Card from "../Common/Card";
import Logo from "../Common/Logo";
import LoginView from "./LoginView";
import SignUpView from "./SignUpView";
import useMeasure from "../../Hooks/useMeasure";

/* style-constants has multiple exported items, you have to destructure it using {} */
import { theme1 } from "../../resources/style-constants";

const ColorOverlay = styled(animated.div)`
  position: fixed;
  height: 100%;
  width: 40%;
  top: 0;
  background-color: ${theme1};
  z-index: -1;
  left: 0%;
`;

const AnimatedSignUpView = styled(animated.div)`
  display: ${({ isLogin }) => (isLogin ? "none" : "block")};
`;

const AnimatedLoginView = styled(animated.div)`
  display: ${({ isLogin }) => (isLogin ? "block" : "none")};
`;

const StyledCard = styled(Card)`
  height: 70%;
`;

const LogoWrapper = styled.div`
  width: 40%;
  max-width: 200px;
`;

const Login = () => {
  /* Variables, hooks, methods go inside the component  */
  const [isLogin, setIsLogin] = useState(true);
  const [bind, { width }] = useMeasure();

  const rightOffset = 0.65;

  const getOffset = (width = 1000) => {
    return rightOffset * width;
  };

  const props = useSpring({
    to: {
      left: isLogin ? 0 : getOffset(width)
    },
    config: { duration: 1000 }
  });

  const loginOpacity = useSpring({
    to: {
      opacity: isLogin ? 1 : 0
    },
    delay: 100,
    config: { duration: 2500 }
  });
  const signUpOpacity = useSpring({
    to: {
      opacity: isLogin ? 0 : 1
    },
    delay: 100,
    config: { duration: 2500 }
  });

  const switchView = () => {
    setIsLogin(!isLogin);
  };

  const updateAuthToken = (token) => {
    let name = "access-token";
    let timeToLive = 15 * 60; //15 minutes;

    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(token);

    cookie += "; max-age=" + timeToLive;

    document.cookie = cookie;
  };

  /* The return is what's is actually being rendered */
  return (
    <div {...bind}>
      <ColorOverlay style={props} {...{ isLogin }} />
      <StyledCard>
        <LogoWrapper>
          <Logo type="mark-with-text" />
        </LogoWrapper>
        <AnimatedLoginView style={loginOpacity} {...{ isLogin }}>
          <LoginView {...{ updateAuthToken, switchView }} />
        </AnimatedLoginView>
        <AnimatedSignUpView style={signUpOpacity} {...{ isLogin }}>
          <SignUpView {...{ updateAuthToken, switchView }} />
        </AnimatedSignUpView>
      </StyledCard>
    </div>
  );
};

/* In order to use the component, you have to export it.
 * the keyword default says that there is only one thing being exported.
 * (see resources/style-constants for exporting multiple items)
 */
export default Login;
