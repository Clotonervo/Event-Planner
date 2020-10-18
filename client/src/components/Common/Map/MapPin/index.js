import React from "react";
import styled from "styled-components";
import { HiLocationMarker } from 'react-icons/hi';

import { red1 } from '../../../../resources/style-constants'

const MapPinContainer = styled.div`
  width: 128px;
  color: ${red1};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapPinIcon = styled.div`
  height: 48px;
  width: 48px;
`;

const MapPinLabel = styled.h4`
  margin: 0;
  padding: 0;
  line-height: 0;
`;

const MapPin = ({ text }) => {
  return (
    <MapPinContainer>
      <MapPinIcon as={HiLocationMarker} />
      <br />
      <MapPinLabel>{text}</MapPinLabel>
    </MapPinContainer>
  );
}

export default MapPin;
