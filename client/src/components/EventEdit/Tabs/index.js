import React from "react";
import styled from "styled-components";
import Tab from "./Tab";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tabs = ({ currentView, pageViews, setCurrentView }) => {
  return (
    <Wrapper>
      <TabsWrapper>
        <Tab
          label={pageViews.about}
          selected={currentView === pageViews.about}
          switchView={setCurrentView}
        />
        <Tab
          label={pageViews.todo}
          selected={currentView === pageViews.todo}
          switchView={setCurrentView}
        />
      </TabsWrapper>
    </Wrapper>
  );
};

export default Tabs;
