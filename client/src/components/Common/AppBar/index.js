import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {
  theme1,
  spacing8,
  spacing24,
  spacing128,
  appBarHeight
} from "../../../resources/style-constants";
import Logo from "../Logo";

const Wrapper = styled.div`
  height: ${appBarHeight};
  /*This property adjusts the layout, 
  so the next component rendered will be just below the app bar.*/
`;

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ color }) => color};
  align-items: center;
  width: 100%;
  height: ${appBarHeight};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
`;

const LogoWrapper = styled.div`
  padding: ${spacing8};
  width: ${spacing128};
  &:hover {
    cursor: pointer;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${spacing8};
  cursor: default;
`;

const PaddedIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 ${spacing8};
  &:hover {
    cursor: pointer;
  }
`;

const Username = styled.h3`
  padding-top: ${spacing24};
  margin: 0;
`;

const AppBar = ({ username = "Username", color = theme1 }) => {
  const history = useHistory();
  const redirectToHome = () => {
    history.push("/");
  };
  return (
    <Wrapper>
      <Bar {...{ color }}>
        <LogoWrapper onClick={redirectToHome}>
          <Logo type={"mark-with-text"} />
        </LogoWrapper>
        <UserWrapper>
          <Username> {username}</Username>
          <PaddedIcon>
            <img src="person-icon.svg" alt="user icon" />
          </PaddedIcon>
        </UserWrapper>
      </Bar>
    </Wrapper>
  );
};

export default AppBar;
