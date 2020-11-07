import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FiCalendar } from "react-icons/fi";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import Date from "../Date";
import { spacing8 } from "../../../resources/style-constants";

const Container = styled.div`
  height: 100%;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const IconContainer = styled.div`
  padding-left: ${spacing8};
`;

const DateEditable = ({
  format = "short",
  value,
  onEditValue,
  ...props
}) => {
  return (
    <DatePicker
      onChange={onEditValue}
      value={value}
      customInput={(
        <Container {...props}>
          <Date {... { format, value }} />
          <IconContainer>
            <FiCalendar />
          </IconContainer>
        </Container>
      )}
    />
  );
}

DateEditable.propTypes = {
  format: PropTypes.oneOf(["short"]),
  onEditValue: PropTypes.func,
  value: PropTypes.any,
};

export default DateEditable;
