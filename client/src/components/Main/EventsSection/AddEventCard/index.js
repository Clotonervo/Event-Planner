import React from "react";
import styled from "styled-components";
import ActionCard from "../../ActionCard";
import { link, spacing16 } from "../../../../resources/style-constants";

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  align-items: center;
  padding: ${spacing16};
`;

const TextStyle = styled.div`
  font-size: 1.8vw;
  color: ${link};
`;

const ImgStyle = styled.img`
  width: 30%;
`;

/** button is colored with the theme color */
const AddEventCard = ({ onClick, ...props }) => {
  return (
    <ActionCard onClick={() => onClick()}>
      <CardStyle>
        <ImgStyle src="add.svg"></ImgStyle>
        <TextStyle>Add Event</TextStyle>
      </CardStyle>
    </ActionCard>
  );
};
export default AddEventCard;
