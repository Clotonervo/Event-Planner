/* Imports always go at the top.
 * Always include import React from "react".
 * Any hooks you import go inside of {} */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

/* Imports from within our app, should go below third party imports */
/* Since Input uses the default export, don't need brackets */
import Input from "../Common/Input";
import PrimaryButton from "../Common/SecondaryButton";

/* style-constants has multiple exported items, you have to destructure it using {} */
import { spacing16, theme1 } from "../../resources/style-constants";

/* Styled constants go outside of the main function component */

/* styling a default html element use styled.elementName */
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledH1 = styled.h1`
  padding: ${spacing16} 0;
`;

/* styling a custom component use styled(CompontentName) */
const StyledButton = styled(PrimaryButton)`
  background-color: ${theme1};
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

  /* The return is what's is actually being rendered */
  return (
    <div>
      <StyledH1>Login</StyledH1>
      <FormWrapper>
        <p>Email</p>
        <Input />
        <p>Password</p>
        <Input />
      </FormWrapper>
      <StyledButton text="Text for button" />
    </div>
  );
};

/* In order to use the component, you have to export it.
 * the keyword default says that there is only one thing being exported.
 * (see resources/style-constants for exporting multiple items)
 */
export default Login;
