import React from "react";
import styled from "styled-components";
import GoogleMapReact from 'google-map-react'
import { HiLocationMarker } from 'react-icons/hi';

import { borderRadius, red1 } from '../../../resources/style-constants'

const Container = styled.div`
  width: 100%;
  height: 30vw;
  border-radius: ${borderRadius};
  overflow: hidden;
`;

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: ${borderRadius};
`;

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

const InvalidMapContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

/**
 * @coords 
 * ({ lat: 0, lng: 0 }) The coordinates of the the destination.
 * 
 * @zoomLevel
 * (number) How far the map will be zoomed in on start.
 * 
 * @locationLabel
 * (string) The text that appears below the map pin.
 */
const Map = ({ location, zoomLevel, locationLabel }) => {
  const DEFAULT_LOCATION = { lat: 59.95, lng: 30.33 };
  const DEFAULT_ZOOM = 11;

  console.log(`API: ${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)

  const map = process.env.REACT_APP_GOOGLE_MAPS_API_KEY !== undefined ?
    (
      <MapContainer as={GoogleMapReact}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={location ?? DEFAULT_LOCATION}
        defaultZoom={zoomLevel ?? DEFAULT_ZOOM}
      >
        <MapPin
          lat={DEFAULT_LOCATION.lat}
          lng={DEFAULT_LOCATION.lng}
          text={locationLabel}
        />
      </MapContainer>
    ) :
    (
      <InvalidMapContainer>
        <p>
          Unable to render map. No API key present.
        </p >
      </InvalidMapContainer >
    );

  return (
    <Container>
      {map}
    </Container>
  );
}

export default Map;
