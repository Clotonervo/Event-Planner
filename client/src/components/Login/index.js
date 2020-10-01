/* Imports always go at the top.
 * Always include import React from "react".
 * Any hooks you import go inside of {} */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

/* Imports from within our app, should go below third party imports */
/* Since Input uses the default export, don't need brackets */
import Input from "../Common/Input";
import PrimaryButton from "../Common/PrimaryButton";
import Link from "../Common/Link";
import H1 from "../Common/Headings/Heading1";
import Stack from "../Common/Stack";
import Card from "../Common/Card";
import Logo from "../Common/Logo";

/* style-constants has multiple exported items, you have to destructure it using {} */
import {
  spacing8,
  spacing16,
  spacing32,
  spacing64,
  theme1
} from "../../resources/style-constants";

/* Styled constants go outside of the main function component */

const SplitView = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
`;

const ColorOverlay = styled.div`
  position: fixed;
  height: 100%;
  width: 40%;
  top: 0;
  left: 0;
  background-color: ${theme1};
  z-index: -1;
`;

const StyledCard = styled(Card)`
  height: 70%;
`;

const Left = styled.div`
  display: grid;
  grid-template-rows: 15% auto;
`;

const LogoWrapper = styled.div`
  width: 40%;
  max-width: 200px;
`;

const CenteredH1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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

/* styling a default html element use styled.elementName */
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PaddedLabel = styled.label`
  padding: ${spacing8} 0;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  width: 100%;
`;

const AdditionalLink = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledH1 = styled(H1)`
  // padding-bottom: ${spacing16};
`;

/* styling a custom component use styled(CompontentName) */

const ButtonWrapper = styled.div`
  padding: ${spacing8} 0;
`;
const StyledButton = styled(PrimaryButton)`
  background-color: ${theme1};
`;

const PaddedLink = styled(Link)`
  padding-left: ${spacing16};
`;

const WhiteSpace = styled.div`
  padding: ${spacing32};
`;

const Login = () => {
  /* Variables, hooks, methods go inside the component  */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("This will be triggered when the component first loads");
    setEmail("testing@mail.com");
    setPassword("password");
  }, []);

  useEffect(() => {
    console.log("This code will be triggered whenever email updates");
  }, [email]);

  const handleSubmit = () => {
    console.log("Clicked Sign In");
  };

  /* The return is what's is actually being rendered */
  return (
    <div>
      <ColorOverlay />
      <StyledCard>
        <SplitView>
          <Left>
            <LogoWrapper>
              <Logo type="mark-with-text" />
            </LogoWrapper>
            <CenteredH1>
              <H1>Welcome Back!</H1>
            </CenteredH1>
          </Left>
          <Right>
            <RightContent>
              <Stack gapSize={spacing32}>
                <StyledH1>Login</StyledH1>
                <FormWrapper>
                  <form onSubmit={handleSubmit}>
                    <Stack gapSize={spacing32}>
                      <InputWrapper>
                        <PaddedLabel>Email</PaddedLabel>
                        <Input fullWidth />
                      </InputWrapper>
                      <InputWrapper>
                        <PaddedLabel>Password</PaddedLabel>
                        <Input fullWidth />
                        <AdditionalLink>
                          <Link url="/signup">Forgot Password?</Link>
                        </AdditionalLink>
                      </InputWrapper>

                      <div>
                        <ButtonWrapper>
                          <StyledButton fullWidth onClick={handleSubmit}>
                            Sign In
                          </StyledButton>
                        </ButtonWrapper>
                        <AdditionalLink>
                          Don't have an account?{" "}
                          <PaddedLink url="/signup">Sign up</PaddedLink>
                        </AdditionalLink>
                      </div>
                    </Stack>
                  </form>
                </FormWrapper>
              </Stack>
              <WhiteSpace />
            </RightContent>
          </Right>
        </SplitView>
      </StyledCard>
    </div>
  );
};

/* In order to use the component, you have to export it.
 * the keyword default says that there is only one thing being exported.
 * (see resources/style-constants for exporting multiple items)
 */
export default Login;
