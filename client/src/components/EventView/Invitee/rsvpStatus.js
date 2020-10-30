import React from "react";
import styled from "styled-components";

const ImgX = styled.img`
height: 28%;
position: absolute;
right:0;
top:0;
`;


const RsvpStatus = ({rsvpStatus}) => {
    return(
        <div>
            {rsvpStatus === "accepted" && <ImgX src = "blue_check.svg"></ImgX>}
            {rsvpStatus === "declined" && <ImgX src = "red_x.svg"></ImgX>}
        </div>
    );
};

export default RsvpStatus;