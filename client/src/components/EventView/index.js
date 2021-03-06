import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import ColorService from "../../services/ColorService";
import ServiceClient from "../../services";
import styled from "styled-components";

import ActionPrompt from "../Common/ActionPrompt";
import AppBar from "../Common/AppBar";
import CenteredLoadingSpinner from "../Common/CenteredLoadingSpinner";
import Stack from "../Common/Stack";
import Description from "./Description";
import Header from "./Header";
import Layout from "../Layout";
import Location from "./Location";
import InviteesDisplay from "./InviteesDisplay";
import YoureInvited from "./YoureInvited";
import PageAccess from "../Common/PageAccess";
import Error from "../Common/Error";

import {
  theme1,
  spacing32,
  spacing128,
  fontSize24
} from "../../resources/style-constants";

const PaddedPrompt = styled(ActionPrompt)`
  margin: 0 ${spacing128};
  margin-top: ${spacing32};
`;

const EventView = () => {
  const [eventColor, setEventColor] = useState(undefined);
  const [eventID, setEventID] = useState(undefined);
  const [event, setEvent] = useState(undefined);
  const [apiStatus, setApiStatus] = useState({
    loading: true,
    error: false,
    message: undefined
  });

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const eventColor = ColorService.formatHex(params.get("color"));
    if (eventColor) {
      setEventColor(eventColor);
    }

    const eventID = params.get("id");
    if (eventID) {
      setEventID(eventID);
      loadEvent(eventID);
    }
  }, [location.search]);

  const invitedButtonClicked = () => {
    console.log("button pressed");
  };

  const sortPeople = (people) => {
    return people.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    );
  };

  const loadEvent = async (eventID) => {
    setApiStatus({
      ...apiStatus,
      loading: true
    });

    const nextApiStatus = { ...apiStatus };
    try {
      const res = await ServiceClient.event(eventID);
      if (res.success) {
        nextApiStatus.error = false;
        let event = { ...res.event };
        event.viewers = sortPeople(event.viewers);
        event.collaborators = sortPeople(event.collaborators);
        setEvent(event);
        console.log(event);
      } else {
        nextApiStatus.error = true;
        nextApiStatus.message = "An error occurred. Please try again later.";
      }
    } catch (error) {
      console.error(`Unable to fetch event`, error);
      nextApiStatus.error = true;
      nextApiStatus.message = error.message;
    }

    nextApiStatus.loading = false;
    setApiStatus(nextApiStatus);
  };

  const effectiveColor = eventColor ?? theme1;
  if (apiStatus?.loading ?? true) {
    return (
      <CenteredLoadingSpinner
        size={150}
        color={effectiveColor}
        loading={apiStatus.loading}
      />
    );
  }

  return (
    <div>
      <PageAccess />
      <AppBar color={effectiveColor} />
      {apiStatus.loading ? (
        <CenteredLoadingSpinner
          size={150}
          color={effectiveColor}
          loading={apiStatus.loading}
        />
      ) : (
        <>
          {apiStatus.error ? (
            <Layout>
              <Error fontSize={fontSize24}>
                {apiStatus.message ||
                  "An error occurred. Please try again later."}
              </Error>
            </Layout>
          ) : (
            <>
              <Header event={event} backgroundColor={effectiveColor} />
              <Layout>
                <Stack gapSize={spacing32}>
                  <PaddedPrompt
                    mainText="Are you going?"
                    primaryText="Yes"
                    secondaryText="No"
                  />

                  <Description description={event?.description ?? ""} />
                  <Location address={event?.location?.address ?? "China"} />
                  <InviteesDisplay viewers={event?.viewers ?? []} />

                  <YoureInvited
                    mainText="You're Invited Too!"
                    supportingText="Are You Going?"
                    primaryText="Yes!"
                    primaryOnClick={invitedButtonClicked}
                    secondaryText="No"
                    secondaryOnClick={invitedButtonClicked}
                  />
                </Stack>
              </Layout>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EventView;
