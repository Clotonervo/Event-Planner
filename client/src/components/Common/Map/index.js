import React from "react";
import styled from "styled-components";
import GoogleMapReact from 'google-map-react'

import { borderRadius } from '../../../resources/style-constants'
import { MapPin } from '../MapPin';

const Container = styled.div`
  height: 100%;
  width: 100%;
  border-radius: ${borderRadius};
  background-color: red;
`;

/**
 * @coords 
 * The coordinates of the the destination. Example:
 * {
 *  lat: 50.2,
 *  lng: 29.3,
 * }
 */
const Map = ({ location, zoomLevel }) => {
  return (
    <Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <MapPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
      hello
    </Container >
  );
}

export default Map;
