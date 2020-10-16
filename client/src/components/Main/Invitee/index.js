import React from "react";
import styled from "styled-components";
import RsvpStatus from "./rsvpStatus";

const InviteeContainer = styled.div`
  height: 9vw;
  width: 6vw;
  transition: transform 0.08s ease-in-out;
  transition: box-shadow 0.08s ease-in-out;
  transform: scale(1.0, 1.0);
  cursor: pointer;

  :hover {
    opacity: .5;
  }
  :active {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.06), 0 6px 8px 0 rgba(0, 0, 0, 0.06);
  }
`;

const CardStyle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const TextBar = styled.div`
padding: 15% 15%;
font-size: 1.8vw;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
position: absolute;
//left: 0;
bottom: 0;
`;

const ImgFace = styled.img`
width: 100%;
position: absolute;
right:0;
top:0;
`;

//rsvpStatus: accepted, declined, pending
const Invitee = ({color,name,rsvpStatus,...props}) => {
    //style = {{backgroundColor: color}}
return <InviteeContainer><ImgFace src = "face.svg"></ImgFace>
        <CardStyle><RsvpStatus {...{rsvpStatus}}/>
        <TextBar>{name}</TextBar></CardStyle>
    </InviteeContainer>
};
export default Invitee;