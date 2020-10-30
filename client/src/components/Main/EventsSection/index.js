import React from "react";
import styled from "styled-components";
import Events from "./Events";
import { fontSize56 } from "../../../resources/style-constants";

const StyledH1 = styled.h1`
  font-size: ${fontSize56};
`;

const EventsSection = ({
  isUpcoming,
  events = [],
  redirectToEventView,
  redirectToEventEdit,
  leaveEvent
}) => {
  return (
    <div>
      <StyledH1>{isUpcoming ? "Upcoming Events" : "Past Events"}</StyledH1>
      <Events
        {...{
          isUpcoming,
          events,
          redirectToEventEdit,
          redirectToEventView,
          leaveEvent
        }}
      />
    </div>
  );
};

export default EventsSection;
