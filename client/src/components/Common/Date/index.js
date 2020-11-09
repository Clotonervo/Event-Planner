import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const DateFormats = {
  "short": "MM/DD/YYYY",
};

/** Displays a formatted date. */
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
  /** The format of date to display. */
  format: PropTypes.oneOf(["short"]),

  /** The date to display. Must be a date object. */
  value: PropTypes.any,
};

export default Date;
