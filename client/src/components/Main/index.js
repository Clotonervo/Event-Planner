import React, { useState } from "react";
import AppBar from "../Common/AppBar";
import Invites from "./Invites";
import Events from "./Events";
import { spacing64, eventPink } from "../../resources/style-constants";
import Stack from "../Common/Stack";

const testInvites = [
  { name: "event1", isUnopened: true },
  { name: "event2", isUnopened: true },
  { name: "event3", isUnopened: true },
  { name: "event4", isUnopened: true },
  { name: "event4", isUnopened: true },
  { name: "event4", isUnopened: true },
  { name: "event4", isUnopened: true },
  { name: "event4", isUnopened: true },
  { name: "event4", isUnopened: true }
];

const testEvents = [
  {
    neventId: "123",
    eventName: "Event 1",
    location: "123 Apple St.",
    collaborators: [],
    viewers: [],
    past: true
  },
  {
    eventId: "123",
    eventName: "Event 2",
    location: "123 Apple St.",
    collaborators: [],
    viewers: [],
    past: false
  },
  {
    eventId: "123",
    eventName: "Event 3",
    location: "123 Apple St.",
    collaborators: [],
    viewers: [],
    past: false
  }
];

const Main = () => {
  const [upcomingEvents, setUpcomingEvents] = useState(testEvents);
  const [pastEvents, setPastEvents] = useState(testEvents);

  return (
    <div>
      <AppBar color={eventPink} />
      <Stack gapSize={spacing64}>
        <Invites invites={testInvites} />
        <Events isUpcoming={true} events={upcomingEvents} />
        <Events isUpcoming={false} events={pastEvents} />
      </Stack>
    </div>
  );
};

export default Main;
