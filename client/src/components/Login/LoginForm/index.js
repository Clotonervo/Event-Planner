import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ClientService from "../../../services";
import PrimaryButton from "../../Common/Buttons/PrimaryButton";
import Link from "../../Common/Link";
import H1 from "../../Common/Headings/Heading1";
import Error from "../../Common/Error";
import Stack from "../../Common/Stack";
import InputFormField from "../../Common/InputFormField";
import LinkButton from "../../Common/LinkButton";
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

const LoginForm = ({ updateAuthToken, switchView, redirectToHome }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [validationState, setValidationState] = useState({
    username: {
      error: true,
      message: ""
    },
    password: {
      error: true,
      message: ""
    }
  });

  useEffect(() => {
    setIsDisabled(
      validationState.password.error || validationState.username.error
    );
  }, [validationState]);

  const handleChange = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
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

  const login = async () => {
    try {
      const loginStatus = await ClientService.login({ username, password });
      if (loginStatus.success) {
        updateAuthToken && updateAuthToken(loginStatus.authToken);
        redirectToHome();
      } else {
        //Default error message just in case.
        setLoginError(true);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = (e) => {
    setLoginError(false);
    e.preventDefault();
    login();
  };

  return (
    <Stack gapSize={spacing32}>
      <H1>Login</H1>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Stack gapSize={spacing32}>
            <InputFormField
              name="username"
              value={username}
              placeholder="something@gmail.com"
              label="Username"
              required
              changeHandler={handleChange}
              validateInput={validateUsername}
              validityState={validationState.username}
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
            >
              <AdditionalLink>
                <Link url="/signup">Forgot Password?</Link>
              </AdditionalLink>
            </InputFormField>
            <div>
              <ButtonWrapper>
                <PrimaryButton
                  fullWidth
                  onClick={handleSubmit}
                  disabled={isDisabled}
                  type="theme"
                >
                  Sign In
                </PrimaryButton>
              </ButtonWrapper>
              <AdditionalLink>
                Don't have an account?{" "}
                <PaddedLink text="Sign Up" onClick={switchView} />
              </AdditionalLink>
              {errorMessage && <Error>{errorMessage}</Error>}
              {loginError && (
                <Error>Something went wrong. Please try again later.</Error>
              )}
            </div>
          </Stack>
        </form>
      </FormWrapper>
    </Stack>
  );
};

export default LoginForm;
