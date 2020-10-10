import React from "react";
import styled from "styled-components";
import {theme1, theme2} from "../../../resources/style-constants"

const CardStyle = styled.button`
background-color: theme1;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
padding: 0% 0%;
border-radius: 7px;
border-width: 10px;
height: 150px;
width:100px;
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
const AddEventCard = ({onClick,...props}) => {
  return <CardStyle class = "footer" onClick = {onClick} style = {{
    backgroundColor: 'white',
    width: '150px',
    height: '100px',
    border: '1px solid lightgrey'}}><p style = {{color: 'blue',fontSize:'50px', margin:'0px'}}>+</p><p style = {{color: 'blue', margin: '0px'}}>Create Event</p>
</CardStyle>;
};
export default AddEventCard;