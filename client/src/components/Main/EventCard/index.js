import React from "react";
import styled from "styled-components";
import {theme1, theme2} from "../../../resources/style-constants"
import ActionCard from "../ActionCard"

const CardStyle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const TextBar = styled.div`
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
opacity: .9;
border-top-left-radius: 7px;
border-top-right-radius: 7px;
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

const ImgDot = styled.img`
height: 40%;
position: absolute;
right:0;
top:0;
`;

/** button is colored with the theme color */
const EventCard = ({color,text,onClick,...props}) => {
    //style = {{backgroundColor: color}}
return <ActionCard onClick = {onClick}>
        <CardStyle>
            <ColorBar {...{ color }}><ImgDot src = "menu_dots.svg"></ImgDot></ColorBar>
            <TextBar>{text}</TextBar>
        </CardStyle>
    </ActionCard>
};
export default EventCard;