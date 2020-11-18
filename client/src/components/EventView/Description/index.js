import React from "react";
import styled from "styled-components";

const TextBar = styled.div`
font-size: 2.2vw;
font-weight: bold;
padding: 3% 0%;
`;

//takes in a description
const Description = ({description,...props}) => {
return <div>
    <TextBar>Description</TextBar>
    <div>{description}</div>
</div>
};
export default Description;