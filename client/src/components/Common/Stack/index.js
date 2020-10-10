import React from "react";
import styled from "styled-components";
import { spacing16 } from "../../../resources/style-constants";

const Wrapper = styled.div`
  display: grid;
  grid-gap: ${(props) => props.gapSize};
  grid-auto-columns: 100%;
`;

const Stack = ({ gapSize = spacing16, children, ...props }) => {
  return <Wrapper {...{ gapSize, ...props }}>{children}</Wrapper>;
};

export default Stack;
