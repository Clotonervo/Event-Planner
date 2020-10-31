import React, { useState, useEffect } from "react";
import styled from "styled-components";

import ClientService from "../../../services";
import PrimaryButton from "../../Common/Buttons/PrimaryButton";
import LinkButton from "../../Common/LinkButton";
import H1 from "../../Common/Headings/Heading1";
import Stack from "../../Common/Stack";
import InputFormField from "../../Common/InputFormField";
import Error from "../../Common/Error";
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

const SignUpForm = ({ updateAuthToken, switchView, redirectToHome }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [signUpError, setSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [validationState, setValidationState] = useState({
    name: {
      error: true,
      message: ""
    },
    username: {
      error: true,
      message: ""
    },
    password: {
      error: true,
      message: ""
    }
  });

  const handleChange = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    if (name === "name") {
      setName(value);
    } else if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  useEffect(() => {
    setIsDisabled(
      validationState.password.error ||
        validationState.username.error ||
        validationState.name.error
    );
  }, [validationState]);

  const validateName = () => {
    let nameState = {
      error: false,
      message: ""
    };
    if (!name) {
      nameState.error = true;
      nameState.message = "Name is required";
    }
    setValidationState({
      ...validationState,
      name: nameState
    });
  };

  const validateUsername = () => {
    let usernameState = {
      error: false,
      message: ""
    };
    if (!username) {
      usernameState.error = true;
      usernameState.message = "Email is required";
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
      const signUpStatus = await ClientService.register({
        name,
        username,
        password
      });
      if (signUpStatus.success) {
        updateAuthToken && updateAuthToken(signUpStatus.authToken);
        redirectToHome();
      } else if (!signUpStatus.success) {
        setErrorMessage(signUpStatus.message);
      } else {
        // Default error just in case.
        setSignUpError(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp();
  };

  return (
    <Stack gapSize={spacing32}>
      <H1>Create Account</H1>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Stack gapSize={spacing32}>
            <InputFormField
              name="name"
              value={name}
              placeholder="John Doe"
              label="Name"
              changeHandler={handleChange}
              validateInput={validateName}
              validityState={validationState.name}
              fullWidth
            />
            <InputFormField
              name="username"
              value={username}
              placeholder="something@gmail.com"
              label="Username"
              required
              validateInput={validateUsername}
              changeHandler={handleChange}
              validityState={validationState.username}
              fullWidth
            />
            <InputFormField
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
            />
            <div>
              <ButtonWrapper>
                <PrimaryButton
                  fullWidth
                  onClick={handleSubmit}
                  disabled={isDisabled}
                  type="theme"
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
