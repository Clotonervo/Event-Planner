import React from "react";
import styled from "styled-components";
import { useSpring, animated } from 'react-spring'

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
  cursor: pointer;
`;

const TriangleFlapContainer = styled.div`
  width: 100%;
`;

const TriangleFlap = styled.svg`
  fill: white;
  -webkit-filter: drop-shadow( 3px 8px 4px rgba(0, 0, 0, .2));
  filter: drop-shadow( 3px 8px 4px rgba(0, 0, 0, .2));
`;

const TriangleFlapPolygon = styled.polygon`
`;

const getCSSFlapTransformation = (isRotated) => {
  const rotation = `rotateX(${isRotated ? -40 : 0}deg)`;
  const trfm = `perspective(400px) ${rotation}`;
  return trfm;
}

const Invitation = () => {
  const [springProps, setSpring] = useSpring(() => ({
    transform: getCSSFlapTransformation(false),
    transformOrigin: `50% 0%`,
    duration: 300,
    config: {
      mass: 1,
      tension: 444,
      friction: 26,
    },
  }))

  return (
    <TemporaryContainer
      onMouseEnter={() => {
        console.log(`setting spring ENTER`)
        setSpring({
          transform: getCSSFlapTransformation(true),
        });
      }}
      onMouseLeave={() => {
        console.log(`setting spring EXIT`)
        setSpring({
          transform: getCSSFlapTransformation(false),
        });
      }}
    >
      <TriangleFlapContainer as={animated.div} style={springProps}>
        <TriangleFlap width="100%" height="100%" viewBox="0 0 100 100">
          <TriangleFlapPolygon points="2,2 98,2 50,30" />
        </TriangleFlap>
      </TriangleFlapContainer>
    </TemporaryContainer>
  );
}

export default Invitation;
