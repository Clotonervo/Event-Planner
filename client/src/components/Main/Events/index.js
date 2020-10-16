import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Event from "../EventCard";
import AddEvent from "../AddEventCard";
import LinkButton from "../../Common/LinkButton";
import {
  fontSize24,
  fontSize56,
  spacing24,
  eventYellow,
  eventOrange,
  eventGreen,
  eventPink
} from "../../../resources/style-constants";

const StyledH1 = styled.h1`
  font-size: ${fontSize56};
`;

const ViewAllWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${spacing24};
`;

const colors = [eventYellow, eventOrange, eventGreen, eventPink];

const Events = ({ isUpcoming, events = [] }) => {
  const eventsToShow = isUpcoming ? 5 : 6;

  const filterEvents = (events) => {
    return events.length > eventsToShow
      ? events.slice(0, eventsToShow)
      : events;
  };

  const [viewAll, setViewAll] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(filterEvents(events));

  useEffect(() => {
    if (viewAll) {
      setVisibleEvents(events);
    }
  }, [viewAll, events]);

  const clickViewAll = () => {
    setViewAll(true);
  };

  return (
    <div>
      <StyledH1>{isUpcoming ? "Upcoming Events" : "Past Events"}</StyledH1>
      {visibleEvents.length > 0 && (
        <Grid container direction="row" justify="flex-start" spacing={10}>
          {isUpcoming && (
            <Grid item>
              <AddEvent />
            </Grid>
          )}
          {visibleEvents.map((event) => {
            return (
              <Grid item>
                <Event
                  {...{ event }}
                  color={colors[Math.floor(Math.random() * colors.length)]}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      <ViewAllWrapper>
        {events.length !== visibleEvents.length && (
          <LinkButton
            text="View All"
            onClick={clickViewAll}
            fontSize={fontSize24}
          />
        )}
      </ViewAllWrapper>
    </div>
  );
};

export default Events;
