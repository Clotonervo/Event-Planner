import React from "react";
import styled from "styled-components";
import { FaTrash} from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { IconContext } from "react-icons";
import "./index.css";

const InviteeContainer = styled.div`
  height: 3.5vw;
  width: 100%;
  transition: transform 0.08s ease-in-out;
  transition: box-shadow 0.08s ease-in-out;
  transform: scale(1.0, 1.0);
  cursor: pointer;
  border-bottom: 1px solid grey;
  margin: .6%;
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

const PicStyle = styled.div`
display: flex;
padding: 0% .5%;
flex-direction: row;
justify-content: center;
align-items: center;
`;

const TextBar = styled.div`
padding: .8% 2%;
font-size: 1.7vw;
`;

const ImgFace = styled.img`
height: 80%;
`;

const ImgTrash = styled.div`
:hover {
    opacity: .5;
}
`;

const InviteeListItem = ({pic,name,onDelete,...props}) => {
return <InviteeContainer><CardStyle>
        <PicStyle><CgProfile></CgProfile></PicStyle>
        <TextBar>{name}</TextBar><IconContext.Provider value={{ color: "gray", className: 'react-icons' }}><ImgTrash><FaTrash onClick = {onDelete}/></ImgTrash></IconContext.Provider>
        </CardStyle>
    </InviteeContainer>
};
export default InviteeListItem;