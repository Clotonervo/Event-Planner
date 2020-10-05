import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ClientService from "../../../services";

import PrimaryButton from "../../Common/PrimaryButton";
import Link from "../../Common/Link";
import H1 from "../../Common/Headings/Heading1";
import Error from "../../Common/Error";
import Stack from "../../Common/Stack";
import InputField from "../InputField";
import LinkButton from "../LinkButton";
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

const LoginForm = ({ setIsLogin }) => {
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

  const switchView = () => {
    setIsLogin(false);
  };

  const handleChange = (e) => {
    const input = e.target;
    const value = input.value;
    const name = input.name;

    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
    if (username.includes("@") && password.length > 6) {
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

  const login = async () => {
    try {
      const loginStatus = await ClientService.login({ username, password });
      debugger;
      if (loginStatus.success) {
        updateAuthToken(loginStatus.authToken);
        //TODO: if success, redirect to home page
      } else if (loginStatus.success ?? false) {
        setErrorMessage(loginStatus.message);
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  const handleSubmit = (e) => {
    setLoginError(false);
    e.preventDefault();
    login();
  };

  const updateAuthToken = (token) => {
    let name = "access-token";
    let timeToLive = 15 * 60; //15 minutes;

    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(token);

    cookie += "; max-age=" + timeToLive;

    document.cookie = cookie;
  };

  return (
    <Stack gapSize={spacing32}>
      <H1>Login</H1>
      <FormWrapper>
        <form onSubmit={handleSubmit}>
          <Stack gapSize={spacing32}>
            <InputField
              value={username}
              changeHandler={handleChange}
              name="username"
              fullWidth
              label="Username"
              onBlur={validateUsername}
              validityState={validationState.username}
            />
            <InputField
              value={password}
              changeHandler={handleChange}
              name="password"
              fullWidth
              label="Password"
              type="password"
              onBlur={validatePassword}
              validityState={validationState.password}
            >
              <AdditionalLink>
                <Link url="/signup">Forgot Password?</Link>
              </AdditionalLink>
            </InputField>
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