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

const validateUsername = () => {
  let usernameState = {
    error: false,
    message: ""
  };
  if (!username) {
    usernameState.error = true;
    usernameState.message = "Username is required";
  }
  setValidationState({
    ...validationState,
    username: usernameState
  });
};

const MapEditor = ({
  label,
  name,
  value,
  placeholder,
  changeHandler,
  validityState = {},
  validateInput,
  children,
  required,
}) => {
  const [validationState, setValidationState] = useState({
    address: {
      error: true,
      message: ""
    },
  });

  Geocode.fromAddress("Eiffel Tower").then(
    response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    },
    error => {
      console.error(error);
    }
  );

  return (
    <Container>
      <MapContainer>
        <Map />
      </MapContainer>
      <OptionsContainer>
      <InputFormField
          label={label}
          name={name}
          value={value}
          placeholder="123 Example Address"
          required
          changeHandler={() => {}}
          validateInput={validateUsername}
          validityState={validationState.address}
        />
      </OptionsContainer>
    </Container>
  );
}

export default MapEditor;
