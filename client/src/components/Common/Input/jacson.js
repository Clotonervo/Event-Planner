
import React, { useEffect, useState } from "react";
import styled from "styled-components";


import Input from "../Input/index";
import PrimaryButton from "../SecondaryButton";

import { spacing16, theme1, grey1, grey2, spacing128, spacing8 } from "../../../resources/style-constants";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


const StyledInput = styled.input`
    background-color: white;
    margin: 0px;
    padding: ${spacing16};
    width: 40%;
    border-radius: 10px;
    border-width: 1px;
    height: 20px;
    font-size: 20px;
    
`;

const JacsonLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("This will be triggered when the component first loads");
    setEmail("testing@mail.com");
    setPassword("password");
  }, []);

  useEffect(() => {
    console.log("This code will be triggered whenever email updates");
  },[email]);

  /* The return is what's is actually being rendered */
  return (
    <div>

      <FormWrapper>
        <p><strong>Email</strong></p>
        <StyledInput placeholder = "example@email.com"/>
        <p><strong>Password</strong></p>
        <StyledInput placeholder = "Enter Your Password" type = "password"/>
      </FormWrapper>
    </div>
  );
};

export default JacsonLogin;