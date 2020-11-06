import React from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { FiPrinter, FiSettings, FiDownload } from "react-icons/fi";
import styled from "styled-components";

import IconButton from "../../Common/IconButton";
import InputEditable from "../../Common/InputEditable";
import Stack from "../../Common/Stack";
import {
  theme1,
  fontSize64,
  fontSize24,
  sideMargins
} from "../../../resources/style-constants";

const Container = styled.div`
  background-color: ${(props) => props.bgcolor || theme1};
  padding: 0 ${sideMargins};
`;

const TitleInputContainer = styled.div`
  width: 60%;
`;

const TitleInput = styled.h1`
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

/**
 * The header which appears at the top of the event-edit page.
 */
const Header = ({
  title,
  date,
  dateDisplay,
  backgroundColor,
  onPressDownload,
  onPressPrint,
  onPressSettings,
  onEditTitle,
  ...props
}) => {
  const effectiveDate = dateDisplay ? (
    <>{dateDisplay}</>
  ) : (
    <Moment format="MM/DD/YYYY">{date}</Moment>
  );

  return (
    <Container {...props}>
      <Stack>
        <TitleInputContainer>
          <TitleInput as={InputEditable} value={title} onSaveValue={onEditTitle}/>
        </TitleInputContainer>
        {/* <TitleContainer>{title}</TitleContainer> */}
        {/* <InputEditable></InputEditable> */}
        <DateContainer>{effectiveDate}</DateContainer>
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
        <div></div>
      </Stack>
    </Container>
  );
};

Header.defaultProps = {
  title: "Anne's Birthday Party",
  startDate: `${new Date("05 October 2020 14:48 UTC").toISOString()}`,
  backgroundColor: undefined,
  onPressDownload: undefined,
  onPressPrint: undefined,
  onPressSettings: undefined
};

Header.propTypes = {
  /** The title of the event. */
  title: PropTypes.string,

  /** A date object for when the event starts (javascript Date object). */
  date: PropTypes.any,

  /** A custom date to display, formatted however the user wants it to be. */
  dateDisplay: PropTypes.string,

  /** The color of the container which appears behind the header content. */
  backgroundColor: PropTypes.string,

  /** A callback rasied when the download icon button is pressed. */
  onPressDownload: PropTypes.func,

  /** A callback rasied when the print icon button is pressed. */
  onPressPrint: PropTypes.func,

  /** A callback rasied when the settings icon button is pressed. */
  onPressSettings: PropTypes.func,

  /** A callback rasied when the title is edited. */
  onEditTitle: PropTypes.func,
};

export default Header;
