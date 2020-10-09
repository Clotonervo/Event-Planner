import React from "react";
import styled from "styled-components";

/**
 * TODO: Replace this with Justin's card component which
 * will be reused between the different cards in the home 
 * view.
 */
const TemporaryContainer = styled.div`
  height: 200px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 0px 10px 8px 0px #888888;
`;

const TriangleFlapContainer = styled.div`
  width: 100%;
`;

const TriangleFlap = styled.svg`
  fill: white;
  -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
  filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
`;

const TriangleFlapPolygon = styled.polygon`
`;

const Invitation = () => {
  return (
    <TemporaryContainer
      onMouseEnter={() => {console.log('entered')}}
      onMouseLeave={() => {console.log('exited')}}
    >
      <TriangleFlapContainer>
        <TriangleFlap width="100%" height="100%" viewBox="0 0 100 100">
          <TriangleFlapPolygon points="0,0 100,0 50,30" />
        </TriangleFlap>
      </TriangleFlapContainer>
    </TemporaryContainer>
  );
}

export default Invitation;
