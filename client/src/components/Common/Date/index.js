import React from "react";
import Moment from "react-moment";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const DateFormats = {
  "short": "MM/DD/YYYY",
};

const Date = ({
  format = "short",
  children,
  ...props
}) => {
  return (
    <Container>
      <Moment format={DateFormats[format]} {...props}>
        {children}
      </Moment>
    </Container>
  );
}

Date.propTypes = {
  format: PropTypes.oneOf(["short"]),
};

export default Date;
