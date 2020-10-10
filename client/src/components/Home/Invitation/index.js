import React from "react";
import styled from "styled-components";
import { useSpring, animated } from 'react-spring'

import ActionCard from '../ActionCard';

const RootCardContainer = styled(ActionCard)`
  padding: 0px;
  margin: 0px;
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
        <TriangleFlapPolygon points="0,0 100,0 50,30" />
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
    <RootCardContainer>
      <StackContainer
        onClick={onClick}
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
        <StackElement>{backLayer}</StackElement>
        <StackElement>{frontLayer}</StackElement>
      </StackContainer>
    </RootCardContainer>
  );
}

export default Invitation;
