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

const StackContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const StackElement = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
`;

const TriangleFlapContainer = styled.div`
  width: 100%;
  pointer-events: none;
`;

const NotifcationDotContainer = styled.div`
  height: calc(100% - 16px);
  width: calc(100% - 16px);
  padding: 8px;
  vertical-align: top;
  text-align: right;
`;

const NotificationDot = styled.div`
  height: 24px;
  width: 24px;
  background-color: blue;
  border-radius: 50%;
  display: inline-block;
`;

const TriangleFlap = styled.svg`
  fill: white;
  -webkit-filter: drop-shadow( 3px 8px 4px rgba(0, 0, 0, .2));
  filter: drop-shadow( 3px 8px 4px rgba(0, 0, 0, .2));
`;

const TriangleFlapPolygon = styled.polygon``;

const getCSSFlapTransformation = (isRotated) => {
  const rotation = `rotateX(${isRotated ? -40 : 0}deg)`;
  const trfm = `perspective(400px) ${rotation}`;
  return trfm;
}

const Invitation = ({ isUnopened, onClick }) => {
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

  const backLayer = (
    <TriangleFlapContainer as={animated.div} style={springProps}>
      <TriangleFlap width="100%" height="20%" viewBox="0 0 100 100">
        <TriangleFlapPolygon points="2,2 98,2 50,30" />
      </TriangleFlap>
    </TriangleFlapContainer>
  );

  const frontLayer = !!isUnopened ?
    (
      <NotifcationDotContainer>
        <NotificationDot />
      </NotifcationDotContainer>
    ) : <div />;

  return (
    <TemporaryContainer
      onMouseEnter={() => {
        setSpring({
          transform: getCSSFlapTransformation(true),
        });
      }}
      onMouseLeave={() => {
        setSpring({
          transform: getCSSFlapTransformation(false),
        });
      }}
    >
      <StackContainer
        onClick={onClick}
      >
        <StackElement>{backLayer}</StackElement>
        <StackElement>{frontLayer}</StackElement>
      </StackContainer>
    </TemporaryContainer>
  );
}

export default Invitation;
