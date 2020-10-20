import React from "react";
import styled from "styled-components";
import { RingLoader } from "react-spinners";
import { theme1, spacing16 } from "../../../resources/style-constants";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${spacing16};
`;

const CenteredLoadingSpinner = ({ color = theme1, loading, size = 150 }) => {
  return (
    <Wrapper>
      <RingLoader {...{ color, loading, size }} />
    </Wrapper>
  );
};

export default CenteredLoadingSpinner;
