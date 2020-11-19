import React from "react";
import styled from "styled-components";

const ImgX = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  width: 2.5vw;
  min-width: 25px;
  z-index: 1;
`;

const RsvpStatus = ({ rsvpStatus }) => {
  return (
    <div>
      {rsvpStatus === "accepted" && <ImgX src="blue_check.svg" />}
      {rsvpStatus === "declined" && <ImgX src="red_x.svg" />}
    </div>
  );
};

export default RsvpStatus;
