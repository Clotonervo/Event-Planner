import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";

const DateFormats = {
  "short": "MM/DD/YYYY",
};

const Date = ({
  format = "short",
  children,
  ...props
}) => {
  return (
    <Moment format={DateFormats[format]} {...props}>
      {children}
    </Moment>
  );
}

Date.propTypes = {
  format: PropTypes.oneOf(["short"]),
  children: PropTypes.any,
};

export default Date;
