import React from "react";
import styled from "styled-components";

const InviteeContainer = styled.div`
  height: 3vw;
  width: 100%;
  transition: transform 0.08s ease-in-out;
  transition: box-shadow 0.08s ease-in-out;
  transform: scale(1.0, 1.0);
  cursor: pointer;
  border-bottom: 1px solid grey;
  margin: 1%;
//   :hover {
//     opacity: .5;
//   }
  :active {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.06), 0 6px 8px 0 rgba(0, 0, 0, 0.06);
  }
`;

const CardStyle = styled.div`
display: flex;
height: 100%;
width: 100%;
flex-direction: row;
justify-content: left;
align-items: left;
`;

const TextBar = styled.div`
padding: .18% 2%;
font-size: 1.7vw;
`;

const ImgFace = styled.img`
height: 80%;
`;

const ImgTrash = styled.img`
height: 80%;
position: absolute;
right:0;
:hover {
    opacity: .5;
}
`;

const InviteeListItem = ({pic,name,onDelete,...props}) => {
return <InviteeContainer><CardStyle>
        <ImgFace src = "face.svg"></ImgFace>
        <TextBar>{name}</TextBar>
        <ImgTrash src = "trash.svg" onClick = {onDelete}></ImgTrash></CardStyle>
    </InviteeContainer>
};
export default InviteeListItem;