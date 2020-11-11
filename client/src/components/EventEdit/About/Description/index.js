import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  borderRadius,
  fontSize20,
  spacing16,
  theme1
} from "../../../../resources/style-constants";

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  border-radius: ${borderRadius};
  padding: ${spacing16};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  font-size: ${fontSize20};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${theme1};
  }
`;

const Description = ({ description = "", updateField }) => {
  const [value, setValue] = useState(description);

  const updateDescription = () => {
    updateField("description", value);
  };

  const handleTextChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <h1>Description</h1>
      <TextArea
        name="description"
        placeholder="Event Details"
        rows="5"
        onBlur={updateDescription}
        onChange={handleTextChange}
        value={value}
      />
    </div>
  );
};

export default Description;

Description.propTypes = {
  description: PropTypes.string,

  /** Method to be called onBlur */
  updateEvent: PropTypes.func
};
