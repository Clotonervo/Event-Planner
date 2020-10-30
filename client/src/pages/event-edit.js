import React from "react";
import Layout from "../components/Layout";
import EventEdit from "../components/EventEdit";

const EventEditPage = () => {
  //TODO: will need to get the eventId from the url
  return (
    <Layout>
      <EventEdit />
    </Layout>
  );
};

export default EventEditPage;
