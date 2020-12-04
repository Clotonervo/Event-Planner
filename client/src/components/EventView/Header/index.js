import React from "react";
import PropTypes from "prop-types";
import { FiPrinter, FiDownload } from "react-icons/fi";
import styled from "styled-components";

import IconButton from "../../Common/IconButton";
import Stack from "../../Common/Stack";
import DateDisplay from "../../Common/Date";
import {
  theme1,
  fontSize64,
  fontSize24,
  spacing8,
  spacing16,
  sideMargins
} from "../../../resources/style-constants";

const Container = styled.div`
  background-color: ${(props) => props.bgcolor || theme1};
  padding: 0 ${sideMargins};
`;

const TitleContainer = styled.div`
  width: 100%;
`;

const TextContainer = styled.div`
  height: 100%;
  width: calc(100% - ${spacing8});
  margin-right: ${spacing16};
  font-size: ${fontSize64};
`;

const DateContainer = styled.div`
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

/**
 * The header which appears at the top of the event-view page.
 */
const Header = ({
  event: {
    title,
    date: { startDate }
  },
  backgroundColor,
  onPressDownload,
  onPressPrint,
  ...props
}) => {
  const realDate = new Date(startDate);
  const format = "long";
  return (
    <Container {...{ bgcolor: backgroundColor, ...props }}>
      <Stack>
        <TitleContainer>
          <TextContainer>{title}</TextContainer>
        </TitleContainer>
        <DateContainer>
          <DateDisplay 
            format={format}
            value={realDate}
          />
        </DateContainer>
        <ButtonBarContainer>
          <IconButton onPressed={onPressDownload}>
            <FiDownload />
          </IconButton>
          <IconButton onPressed={onPressPrint}>
            <FiPrinter />
          </IconButton>
        </ButtonBarContainer>
        <div></div>
      </Stack>
    </Container>
  );
};

Header.defaultProps = {
  title: "Anne's Birthday Party",
  date: new Date("05 October 2020 14:48 UTC"),
  backgroundColor: undefined,
  onPressDownload: undefined,
  onPressPrint: undefined
};

Header.propTypes = {
  /** The title of the event. */
  title: PropTypes.string,

  /** A date object for when the event starts (javascript Date object). */
  date: PropTypes.any,

  /** A custom date to display, formatted however the user wants it to be. */
  // TODO: add this in later, if we need it
  // dateDisplay: PropTypes.string,

  /** The color of the container which appears behind the header content. */
  backgroundColor: PropTypes.string,

  /** A callback rasied when the download icon button is pressed. */
  onPressDownload: PropTypes.func,

  /** A callback rasied when the print icon button is pressed. */
  onPressPrint: PropTypes.func
};

export default Header;
