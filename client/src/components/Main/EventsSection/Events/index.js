import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Event from "../EventCard";
import AddEvent from "../AddEventCard";
import LinkButton from "../../../Common/LinkButton";
import {
  fontSize24,
  spacing24,
  eventYellow,
  eventOrange,
  eventGreen,
  eventPink
} from "../../../../resources/style-constants";

const ViewAllWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${spacing24};
`;

const randColors = [eventYellow, eventOrange, eventGreen, eventPink];

const Events = ({
  isUpcoming,
  events = [],
  redirectToEventView,
  redirectToEventEdit, 
  leaveEvent
}) => {
  const [viewAll, setViewAll] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState([]);

  useEffect(() => {
    const eventsToShow = isUpcoming ? 5 : 6;
    const filterEvents = (events) => {
      return events.length > eventsToShow
        ? events.slice(0, eventsToShow)
        : events;
    };
    setVisibleEvents(filterEvents(events));
  }, [events, isUpcoming]);

  const displayGrid = isUpcoming ? true : events.length > 0;

  useEffect(() => {
    if (viewAll) {
      setVisibleEvents(events);
    }
  }, [viewAll, events]);

  const clickViewAll = () => {
    setViewAll(true);
  };

  return (
    <>
      {displayGrid && (
        <Grid
          container
          direction="row"
          justify-content="space-between"
          spacing={8}
        >
          {isUpcoming && (
            <Grid item key="add">
              <AddEvent onClick={redirectToEventEdit} />
            </Grid>
          )}
          {visibleEvents.map((event, index) => {
            let color = event.color ?? randColors[Math.floor(Math.random() * randColors.length)];
            return (
              <Grid item key={index}>
                <Event
                  {...{
                    event,
                    redirectToEventView,
                    redirectToEventEdit,
                    leaveEvent
                  }}
                  color={color}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      <ViewAllWrapper>
        {visibleEvents.length > 0 && events.length !== visibleEvents.length && (
          <LinkButton
            text="View All"
            onClick={clickViewAll}
            fontSize={fontSize24}
          />
        )}
      </ViewAllWrapper>
    </>
  );
};

export default Events;
