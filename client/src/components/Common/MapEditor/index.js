import React from "react";
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

const MapEditor = () => {
  return (
    <Container>
      <MapContainer>
        <Map />
      </MapContainer>
      <OptionsContainer>
      <InputFormField
          name="username"
          value="temp_value"
          placeholder="something@gmail.com"
          label="Username"
          required
          changeHandler={() => {}}
          validateInput={() => {}}
          validityState={() => {}}
        />
      </OptionsContainer>
    </Container>
  );
}

export default MapEditor;
