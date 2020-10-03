import React from "react";
import styled from "styled-components";
import { spacing16, theme1, grey1, grey2, spacing128, spacing8 } from "../../../resources/style-constants";

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


const Input = ({type = "text", placeholder, onChange, fullwidth = false, ...props}) => {
  return (
    <StyledInput placeholder = {placeholder} type = {type} onChange = {onChange} {...props}/>

  );
};



export default Input;
