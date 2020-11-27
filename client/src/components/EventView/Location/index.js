import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MapService from "../../../services/MapService";
import { spacing32 } from "../../../resources/style-constants";
import Map from "../../Common/Map";
import H1 from "../../Common/Headings/Heading1";

const MapContainer = styled.div`
  height: 30vw;
  width: 100%;
  margin-right: ${spacing32};
`;

/**
 * A location view for an event. Displays a map.
 *
 * ## Usage
 *
 * ```
 * <Location address="Provo UT"/>
 * ```
 */
const Location = ({ address = "", label = "Location" }) => {
  const [location, setLocation] = useState(undefined);

  const lookupAddress = async function (address) {
    const loc = await MapService.getLocationFromAddress(address);
    setLocation(loc);
  };

  useEffect(() => {
    lookupAddress(address, false);
  }, []);

  return (
    <div>
      <h1>{label}</h1>
      <MapContainer>
        <Map location={location} />
      </MapContainer>
    </div>
  );
};

Location.defaultProps = {
  label: "Location",
  address: undefined
};

Location.propTypes = {
  /** The text which appears above the map. */
  label: PropTypes.string,

  /** The adress which will be displayed in the map. */
  address: PropTypes.string
};

export default Location;
