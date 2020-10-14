import React from "react";
import styled from "styled-components";
import GoogleMapReact from 'google-map-react'

import { borderRadius } from '../../../resources/style-constants'

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
    <div>{text}</div>
  );
}

/**
 * @coords 
 * The coordinates of the the destination. Example:
 * {
 *  lat: 50.2,
 *  lng: 29.3,
 * }
 */
const Map = ({ location, zoomLevel }) => {
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
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
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
