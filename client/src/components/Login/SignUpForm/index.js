import React, { useState } from "react";
import styled from "styled-components";

import PrimaryButton from "../../Common/Buttons/PrimaryButton";
import LinkButton from "../LinkButton";
import H1 from "../../Common/Headings/Heading1";
import Stack from "../../Common/Stack";
import InputField from "../InputField";
import {
  spacing8,
  spacing16,
  spacing32
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

const SignUpForm = ({ updateAuthToken, switchView, redirectToHome}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [signUpError, setSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

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

  const validateUsername = () => {
    let usernameState = {
      error: false,
      message: ""
    };
    if (!username) {
      usernameState.error = true;
      usernameState.message = "Username is required";
    }
    setValidationState({
      ...validationState,
      username: usernameState
    });
  };

  const validatePassword = () => {
    let passwordState = {
      error: false,
      message: ""
    };
    if (!password) {
      passwordState.error = true;
      passwordState.message = "Password is required.";
    } else if (password.length < 8) {
      passwordState.error = true;
      passwordState.message = "Password must be at least 8 characters.";
    }
    setValidationState({
      ...validationState,
      password: passwordState
    });
  };

  const signUp = async () => {
    try {
        const signUpStatus = await ServiceClient.signUp({ name, username, password });
        if (signUpStatus.success) {
            updateAuthToken && udpateAuthtoken(signUpStatus.authToken);
            redirectToHome(); // ?
        }
        else if (signUpStatus.success ?? false) {
            setErrorMessage(signUpStatus.message);
        }
    } catch (error) {
        setSignUpError(true);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked sign in");
    console.log(`email: ${email}`);
    console.log(`password: ${password}`);
    SignUp();
  };

  return (
    <Stack gapSize={spacing32}>
      <H1>Create Account</H1>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Stack gapSize={spacing32}>
            <InputField
              name="name"
              value={name}
              placeholder="John Doe"
              label="Name"
              changeHandler={handleChange}
              fullWidth
            />
            <InputField
              name="email"
              value={email}
              placeholder="something@gmail.com"
              label="Email"
              required
              validateInput={validateUsername}
              changeHandler={handleChange}
              validityState={validationState.username}
              fullWidth
            />
            <InputField
              name="password"
              value={password}
              placeholder="Enter your password"
              label="Password"
              type="password"
              required
              changeHandler={handleChange}
              validateInput={validatePassword}
              validityState={validationState.password}
              fullWidth
            ></InputField>
            <div>
              <ButtonWrapper>
                <PrimaryButton
                  fullWidth
                  onClick={handleSubmit}
                  disabled={isDisabled}
                >
                  Sign Up
                </PrimaryButton>
              </ButtonWrapper>
              <AdditionalLink>
                Already have an account?
                <PaddedLink onClick={switchView} text="Sign in" />
              </AdditionalLink>
              {errorMessage && <Error>{errorMessage}</Error>}
              {signUpError && (
                <Error>Something went wrong. Please try again later.</Error>
              )}
            </div>
          </Stack>
        </form>
      </FormWrapper>
    </Stack>
  );
};

export default SignUpForm;