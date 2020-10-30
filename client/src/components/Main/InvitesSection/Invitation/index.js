import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import ActionCard from "../../ActionCard";

import {
  spacing8,
  spacing16,
  spacing24,
  fontSize16,
  link
} from "../../../../resources/style-constants";

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
  width: calc(100% - ${spacing8});
  pointer-events: none;
  padding: ${spacing8};
`;

const NotifcationDotContainer = styled.div`
  height: calc(100% - ${spacing16 * 2});
  width: calc(100% - ${spacing16 * 2});
  padding: ${spacing16};
  vertical-align: top;
  text-align: right;
`;

const NotificationDot = styled.div`
  height: ${spacing24};
  width: ${spacing24};
  background-color: ${link};
  border-radius: 50%;
  display: inline-block;
`;

const TriangleFlap = styled.svg`
  fill: white;
  -webkit-filter: drop-shadow(3px 8px 4px rgba(0, 0, 0, 0.1));
  filter: drop-shadow(3px 8px 4px rgba(0, 0, 0, 0.1));
`;

const ChildContainer = styled.div`
  height: calc(100% - ${spacing16} * 2);
  width: calc(100% - ${spacing16} * 2);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: ${fontSize16};
  padding: ${spacing16} ${spacing16};
  text-align: center;
`;

const TriangleFlapPolygon = styled.polygon``;

const getCSSFlapTransformation = (isRotated) => {
  const rotation = `rotateX(${isRotated ? -40 : 0}deg)`;
  const trfm = `perspective(400px) ${rotation}`;
  return trfm;
};

const Invitation = ({ invite, invite: { isUnopened }, onClick, children }) => {
  const [springProps, setSpring] = useSpring(() => ({
    transform: getCSSFlapTransformation(false),
    transformOrigin: `50% 0%`,
    duration: 300,
    config: {
      mass: 1,
      tension: 444,
      friction: 26
    }
  }));

  const envelopeLayer = (
    <TriangleFlapContainer as={animated.div} style={springProps}>
      <TriangleFlap width="100%" height="20%" viewBox="0 0 100 100">
        <TriangleFlapPolygon points="0,0 100,0 50,30" />
      </TriangleFlap>
    </TriangleFlapContainer>
  );

  const notifLayer = !!isUnopened ? (
    <NotifcationDotContainer>
      <NotificationDot />
    </NotifcationDotContainer>
  ) : (
    <div />
  );

  const childLayer = <ChildContainer>{children}</ChildContainer>;

  return (
    <ActionCard
      onClick={() => onClick(invite)}
      onMouseEnter={() => {
        setSpring({
          transform: getCSSFlapTransformation(true)
        });
      }}
      onMouseLeave={() => {
        setSpring({
          transform: getCSSFlapTransformation(false)
        });
      }}
    >
      <StackContainer>
        <StackElement>{envelopeLayer}</StackElement>
        <StackElement>{notifLayer}</StackElement>
        <StackElement>{childLayer}</StackElement>
      </StackContainer>
    </ActionCard>
  );
};

export default Invitation;
