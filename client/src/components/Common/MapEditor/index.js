import React, { useState } from "react";
import Geocode from "react-geocode";
import styled from "styled-components";

import { spacing32 } from "../../../resources/style-constants";
import InputFormField from "../InputFormField";
import Map from "../Map";

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

const MapEditor = ({
  label,
  value,
  placeholder,
  changeHandler,
  validityState = {},
  validateInput,
  children,
  required,
}) => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(undefined);
  const [validationState, setValidationState] = useState({
    address: {
      error: true,
      message: ""
    },
  });

  const getLocationFromAddress = async function (value) {
    try {
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
      Geocode.setLanguage("en");
      const response = await Geocode.fromAddress(value);
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    } catch (e) {
      console.error(e);
    }

    return undefined;
  };

  const handleChange = (e) => {
    const input = e.target;
    if (input.name === "address") {
      setAddress(input.value);
    } else {
      throw Error(input.name);
    }
  };

  const validateAddress = async function () {
    let addressState = {
      error: false,
      message: ""
    };

    const loc = await getLocationFromAddress(address);
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
  }

  return (
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
          validateInput={validateAddress}
          validityState={validationState.address}
        />
      </OptionsContainer>
    </Container>
  );
}

export default MapEditor;
