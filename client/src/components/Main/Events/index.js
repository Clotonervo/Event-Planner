import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import ActionCard from "../ActionCard";
import LinkButton from "../../Common/LinkButton";
import {
  fontSize24,
  fontSize56,
  spacing24
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

const eventsToShow = 6;

const filterEvents = (events) => {
  return events.length > eventsToShow ? events.slice(0, eventsToShow) : events;
};

const Events = ({ isUpcoming, events = [] }) => {
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
      <StyledH1>{isUpcoming ? "Upcoming Events" : "PastEvents"}</StyledH1>
      {visibleEvents.length > 0 && (
        <Grid container direction="row" justify="flex-start" spacing={10}>
          {/* {isUpcoming && <Grid item><ActionCard />} */}
          {visibleEvents.map((event) => {
            return (
              <Grid item>
                <ActionCard />
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
