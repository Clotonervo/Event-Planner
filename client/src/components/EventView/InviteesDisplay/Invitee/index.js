import React from "react";
import styled from "styled-components";
import RsvpStatus from "../RsvpStatus";
import { spacing16 } from "../../../../resources/style-constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 100px;
  width: 10vw;
  max-width: 200px;
  padding: ${spacing16};
`;

const ImageWrapper = styled.div`
  width: 80%;
  position: relative;
`;

const ImgFace = styled.img`
  width: 100%;
`;

const Name = styled.h5`
  margin: 0;
`;

//rsvpStatus: accepted, declined, pending
const Invitee = ({ person: { name }, index, ...props }) => {
  //Once we have the real status, we would use that instead of this mock
  const mockStatus =
    index % 3 === 0 ? "declined" : index % 2 === 0 ? "accepted" : "pending";
  return (
    <Container {...props}>
      <ImageWrapper>
        <ImgFace src="face.svg" />
        <RsvpStatus rsvpStatus={mockStatus} />
      </ImageWrapper>
      <Name>{name}</Name>
    </Container>
  );
};
export default Invitee;
