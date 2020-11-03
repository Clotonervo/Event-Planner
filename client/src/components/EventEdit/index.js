import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import createDefaultEvent from "./defaultEvent";
import ServiceClient from "../../services";
import About from "./About";
import AppBar from "../Common/AppBar";
import CenteredLoadingSpinner from "../Common/CenteredLoadingSpinner";
import Error from "../Common/Error";
import Header from "./Header";
import Layout from "../Layout";
import PageAccess from "../Common/PageAccess";
import Tabs from "./Tabs";
import TodoList from "./Todo";
import { fontSize24, theme1 } from "../../resources/style-constants";

const pageViews = {
  about: "About",
  todo: "To-do Lists"
};

const EventEdit = () => {
  const [currentView, setCurrentView] = useState("About");
  const [apiStatus, setApiStatus] = useState({
    loading: false,
    error: false,
    message: false
  });

  const testEvent = {
    collaborators: [
      { fullname: "Jane Doe", username: "test1" },
      { fullname: "John Smith", username: "test2" },
      { fullname: "Donald Duck ", username: "test3" }
    ],
    viewers: [
      { fullname: "Mickey Mouse", username: "test4" },
      { fullname: "Minnie Mouse", username: "test5" },
      { fullname: "Daisy Duck", username: "test6" }
    ]
  };
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let eventId = params.get("id");
    if (eventId) {
      loadPageData(eventId);
    } else {
      prepareData(createDefaultEvent());
    }
  }, []);

  const loadPageData = async (eventId) => {
    setApiStatus({ ...apiStatus, loading: true, error: false });
    const newApiStatus = { ...apiStatus };
    try {
      const results = await ServiceClient.event(eventId);
      if (results.success) {
        prepareData(results.event);
      } else {
        // default message just in case
        newApiStatus.error = true;
        newApiStatus.message = "An error occurred. Please try again later.";
      }
    } catch (error) {
      newApiStatus.error = true;
      newApiStatus.message = error.message;
    }
    newApiStatus.loading = false;

    setApiStatus(newApiStatus);
  };

  const prepareData = (event) => {};

  const createDefaultEvent = () => {};

  return (
    <div>
      {/* <PageAccess /> */}
      <AppBar color={theme1} />
      {apiStatus.loading ? (
        <CenteredLoadingSpinner
          size={150}
          color={theme1}
          loading={apiStatus.loading}
        />
      ) : (
        <>
          <Header />
          <Layout>
            <Tabs {...{ currentView, pageViews, setCurrentView }} />
            {currentView === pageViews.about ? (
              <About event={testEvent} />
            ) : (
              <TodoList />
            )}
          </Layout>
        </>
      )}
      {apiStatus.error && (
        <Layout>
          <Error fontSize={fontSize24}>
            {apiStatus.message || "An error occurred. Please try again later."}
          </Error>
        </Layout>
      )}
    </div>
  );
};

export default EventEdit;
