import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import MapService from "../../../../services/MapService";
import { spacing32 } from "../../../../resources/style-constants";
import InputFormField from "../../../Common/InputFormField";
import Map from "../../../Common/Map";

const Container = styled.div`
  width: 100%;
  height: 30vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const MapContainer = styled.div`
  height: 100%;
  width: calc(60% - ${spacing32});
  margin-right: ${spacing32};
`;

const OptionsContainer = styled.div`
  height: 100%;
  width: 40%;
`;

/**
 * Displays a map with an edit field beside it. Use this
 * to provide a GUI to update a maps geolocation (lat, lng).
 *
 * ### IMPORTANT
 * For this api to work, you'll have to enable the geocoding
 * API for your API key.
 *
 * ### Sample usage:
 *
 * ```
 * <MapEditor
 *    label={'My Label'}
 *    onLocationChanged={(location) => {
 *      console.log(`latitude:  ${location.lat}`);
 *      console.log(`longitude: ${location.lng}`)
 *    }}
 * />
 * ```
 */
const MapEditor = ({ label, onLocationChanged }) => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(undefined);
  const [validationState, setValidationState] = useState({
    address: {
      error: true,
      message: ""
    }
  });

  const handleChange = (e) => {
    const input = e.target;
    if (input.name === "address") {
      setAddress(input.value);
    } else {
      throw Error(input.name);
    }
  };

  const lookupAddress = async function () {
    let addressState = {
      error: false,
      message: ""
    };

    const loc = await MapService.getLocationFromAddress(address);
    if (!loc) {
      addressState.error = true;
      addressState.message = "Invalid address";
    } else if (!address) {
      addressState.error = true;
      addressState.message = "Address is required";
    }

    setValidationState({
      ...validationState,
      address: addressState
    });

    setLocation(loc);
    onLocationChanged && onLocationChanged(loc);
  };

  return (
    <div>
      <h1>Location</h1>
      <Container>
        <MapContainer>
          <Map location={location} />
        </MapContainer>
        <OptionsContainer>
          <InputFormField
            label={label}
            name="address"
            value={address}
            placeholder="123 Example Address"
            required
            changeHandler={handleChange}
            onPressEnter={lookupAddress}
            validityState={validationState.address}
          />
        </OptionsContainer>
      </Container>
    </div>
  );
};

MapEditor.defaultProps = {
  label: "",
  onLocationChanged: undefined
};

MapEditor.propTypes = {
  /** The text which appears above the input field. */
  label: PropTypes.string,

  /** A callback invoked whenever the location for the map changes. */
  onLocationChanged: PropTypes.func
};

export default MapEditor;
