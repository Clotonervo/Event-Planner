import React from "react";
import styled from "styled-components";
import ActionCard from "../../ActionCard";
import Menu from "../Menu";
import { borderRadius } from "../../../../resources/style-constants";

const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextBar = styled.div`
  padding: 4%;
  font-size: 1.8vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const ColorBar = styled.div`
  background-color: ${({ color }) => color};
  border-top-left-radius: ${borderRadius};
  border-top-right-radius: ${borderRadius};
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
`;

const EventMenu = styled(Menu)`
  position: absolute;
  right: 0;
  top: 0;
`;

const EventCard = ({
  event,
  event: { title },
  color,
  text,
  redirectToEventView,
  redirectToEventEdit,
  leaveEvent,
  ...props
}) => {
  const menuItems = event.isCollaborator
    ? [
      { text: "View Event", onClick: () => redirectToEventView && redirectToEventView(event) },
      { text: "Edit Event", onClick: () => redirectToEventEdit && redirectToEventEdit(event) },
      { text: "Leave Event", onClick: () => leaveEvent && leaveEvent(event) }
    ]
    : [
      { text: "View Event", onClick: () => redirectToEventView && redirectToEventView(event) },
      { text: "Leave Event", onClick: () => leaveEvent && leaveEvent(event) }
    ];

  return (
    <ActionCard {...props}>
      <CardStyle>
        <ColorBar {...{ color }}>
          <EventMenu items={menuItems} {...{ event }} />
        </ColorBar>
        <TextBar>{title}</TextBar>
      </CardStyle>
    </ActionCard>
  );
};
export default EventCard;
