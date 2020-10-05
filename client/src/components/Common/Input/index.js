import React from "react";
import styled from "styled-components";
import { spacing16, theme1, grey1, grey2, spacing128, spacing8 } from "../../../resources/style-constants";

const StyledInput = styled.input`
    background-color: white;
    margin: 0px;
    padding: ${spacing16};
<<<<<<< HEAD
    width: ${ ({fullwidth}) => fullwidth ? "100%" : "40%"}
=======
    width: 40%;
>>>>>>> fe51bb251b3fe75b6b66f75fd49089188e665524
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
