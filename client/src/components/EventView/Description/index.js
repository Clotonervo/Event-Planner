import React from "react";
import styled from "styled-components";

const TextBar = styled.div`
font-size: 20px;
`;

//takes in a description
const Description = ({description,...props}) => {
return <div>
    <h1>Description</h1>
    <TextBar>{description}</TextBar>
</div>
};
export default Description;