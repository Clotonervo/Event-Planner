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
      <TextBar>
        {description !== ""
          ? description
          : "This event does not have a description yet. Check back later for more details."}
      </TextBar>
    </div>
  );
};
export default Description;
