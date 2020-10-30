import React from "react";
import styled from "styled-components";
import GoogleMapReact from 'google-map-react'

import { borderRadius } from '../../../resources/style-constants'
import MapPin from './MapPin';

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
const Map = ({ 
  location = { lat: 59.95, lng: 30.33 }, 
  zoomLevel = 11, 
  locationLabel = ''
}) => {
  if (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined) {
    console.error(`REACT_APP_GOOGLE_MAPS_API_KEY not specified.`);
  }

  return (
    <Container>
      <MapContainer as={GoogleMapReact}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        center={location}
        defaultZoom={zoomLevel}
      >
        <MapPin
          lat={location.lat}
          lng={location.lng}
          text={locationLabel}
        />
      </MapContainer>
    </Container>
  );
}

export default Map;
