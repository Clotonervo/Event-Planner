import React from "react";
import styled from "styled-components";
import {theme1, theme2} from "../../../resources/style-constants"
import ActionCard from "../ActionCard"

const CardStyle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 15% 22%;
opacity: .65;
`;

const TextStyle = styled.div`
font-size: 1.5vw;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
height: 100%;
width: 50%;
position: relative;
color: blue;
`;

const ImgStyle = styled.img`
height: 100%;
width: 50%;
position: relative;
`;

/** button is colored with the theme color */
const AddEventCard = ({onClick,...props}) => {
    return <ActionCard onClick = {onClick}>
        <CardStyle>
            <ImgStyle src = "add.svg"></ImgStyle>
            <TextStyle>addEvent</TextStyle>
        </CardStyle>
    </ActionCard>
};
export default AddEventCard;