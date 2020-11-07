import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const DateFormats = {
  "short": "MM/DD/YYYY",
};

const Date = ({
  format = "short",
  value,
  ...props
}) => {
  return (
    <Moment format={DateFormats[format]} {...props}>
      {value}
    </Moment>
  );
}

Date.propTypes = {
  format: PropTypes.oneOf(["short"]),
  value: PropTypes.any,
};

export default Date;
