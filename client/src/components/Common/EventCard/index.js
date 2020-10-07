import React from "react";
import styled from "styled-components";
import {theme1, theme2} from "../../../resources/style-constants"

const Button = styled.div`
  background-color: theme1;
  padding: 0% 0%;
  border-radius: 7px;
  border-width: 10px;
  outline: 5px;
  outline-color: #bdbdbd;
  cursor: pointer;
  margin: 0% 0%;
  transition: ease background-color 250ms;
  &:hover {
    background-color: theme2;
    opacity: 0.7;
  }
`;

/** button is colored with the theme color */
const EventCard = ({color,text,onClick,...props}) => {
  return <Button class = "footer" onClick = {onClick} style = {{
            backgroundColor: 'white',
            width: '150px',
            height: '100px',
            border: '1px solid lightgrey'}}>
                <Button
                    style={{
                        height: '65%',
                        backgroundColor: color,
                        width: '150px',
                        alignSelf: 'flex-end'
                    }}
                    ></Button>{text}
        </Button>;
};
export default EventCard;