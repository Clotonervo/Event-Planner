import React, { useState } from "react";
import styled from "styled-components";

import PrimaryButton from "../../Common/PrimaryButton";
import LinkButton from "../LinkButton";
import H1 from "../../Common/Headings/Heading1";
import Stack from "../../Common/Stack";
import InputField from "../InputField";
import {
  spacing8,
  spacing16,
  spacing32,
  theme1
} from "../../../resources/style-constants";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AdditionalLink = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const PaddedLink = styled(LinkButton)`
  padding-left: ${spacing16};
`;

const ButtonWrapper = styled.div`
  padding: ${spacing8} 0;
`;
const StyledButton = styled(PrimaryButton)`
  background-color: ${theme1};
`;

const SignUpForm = ({ setIsLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const switchView = () => {
    setIsLogin(true);
  };

  const handleChange = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }

    if (email.includes("@") && password.length > 6) {
      setIsDisabled(false);
      //TODO: set up proper validation
    } else {
      setIsDisabled(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked sign in");
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);
  };

  return (
    <Stack gapSize={spacing32}>
      <H1>Create Account</H1>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Stack gapSize={spacing32}>
            <InputField
              value={name}
              changeHandler={handleChange}
              name="name"
              fullWidth
              label="Name"
            />
            <InputField
              value={email}
              changeHandler={handleChange}
              name="email"
              fullWidth
              label="Email"
            />
            <InputField
              value={password}
              changeHandler={handleChange}
              name="password"
              fullWidth
              label="Password"
              type="password"
            ></InputField>
            <div>
              <ButtonWrapper>
                <StyledButton
                  fullWidth
                  onClick={handleSubmit}
                  disabled={isDisabled}
                >
                  Sign In
                </StyledButton>
              </ButtonWrapper>
              <AdditionalLink>
                Already have an account?
                <PaddedLink onClick={switchView} text="Sign in" />
              </AdditionalLink>
            </div>
          </Stack>
        </form>
      </FormWrapper>
    </Stack>
  );
};

export default SignUpForm;
