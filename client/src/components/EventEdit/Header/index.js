import React from "react";
import Moment from 'react-moment';
import PropTypes from "prop-types";
import { FiPrinter, FiSettings, FiDownload } from "react-icons/fi";
import styled from "styled-components";

import IconButton from "../../Common/IconButton";
import {
  theme1,
  fontSize64,
  fontSize24,
  spacing24,
} from "../../../resources/style-constants";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${props => props.bgcolor || theme1};
`;

const Spacer = styled.div`
  height: ${spacing24};
`;

const TitleContainer = styled.h1`
  font-size: ${fontSize64};
  margin: 0;
`;

const DateContainer = styled.h5`
  font-size: ${fontSize24};
  opacity: 0.5;
  margin: 0;
`;

const ButtonBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;


const Header = ({
  title,
  startDate,
  // endDate, TODO: do we even need an end date? Leaving it out
  // for now because it just adds complexity.
  backgroundColor,
  onPressDownload,
  onPressPrint,
  onPressSettings,
}) => {

  return (
    <Container>
      <TitleContainer>{title}</TitleContainer>
      <Spacer />
      <DateContainer>
        <Moment format="MM/DD/YYYY">
          {startDate}
        </Moment>
      </DateContainer>
      <Spacer />
      <ButtonBarContainer bgcolor={backgroundColor}>
        <IconButton onPressed={onPressDownload}>
          <FiDownload />
        </IconButton>
        <IconButton onPressed={onPressPrint}>
          <FiPrinter />
        </IconButton>
        <IconButton onPressed={onPressSettings}>
          <FiSettings />
        </IconButton>
      </ButtonBarContainer>
      <Spacer />
    </Container >
  );
}

Header.defaultProps = {
  title: 'Anne\'s Birthday Party',
  startDate: `${new Date('05 October 2020 14:48 UTC').toISOString()}`,
  backgroundColor: undefined,
  onPressDownload: undefined,
  onPressPrint: undefined,
  onPressSettings: undefined,
}

Header.propTypes = {
};

export default Header;