import React from "react";
import styled from "styled-components";
import { fontSize20 } from "../../../resources/style-constants";

const TextBar = styled.div`
  font-size: ${fontSize20};
`;

//takes in a description
const Description = ({ description, ...props }) => {
  return (
    <div {...props}>
      <h1>Description</h1>
      <TextBar>{description}</TextBar>
    </div>
  );
};
export default Description;
