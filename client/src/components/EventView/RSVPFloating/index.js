import React from "react";
import PropTypes from "prop-types";
import { theme1, grey3, lightBlue, eventPink, eventGreen } from "../../../resources/style-constants";
import SecondaryButton from "../../Common/Buttons/SecondaryButton/index.js";
import PrimaryButton from "../../Common/Buttons/PrimaryButton/index.js";
import RSVPCard from "../RSVPCard/index.js"
import styled from "styled-components";


const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 5px;
  |
`;
const AlightRight = styled.div`
display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 45%;
    height: 100%;
    position: absolute;
    Right:0;
    bottom:0;
 `;
const AlightLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 100%;
    position: absolute;
    Left:0;
    bottom:0;
 `;



const RSVPFloating = ({
  onClick,
  align = "right",
  fullWidth,
  disabled,
  children,
  ...props
}) => {
  const respondYes = () => {
      // TODO: Respond Yes
  };
  const respondNo = () => {
      // TODO: Respond No
  }
  return (
    <div >
        <RSVPCard>
            <AlightLeft>
                Are you going? 
            </AlightLeft>
   
                <AlightRight>
                    <SecondaryButton onClick={respondNo}>
                        No.
                    </SecondaryButton>

                    <PrimaryButton onClick={respondYes} type="accent" disabled={false}>
                        Yes
                    </PrimaryButton>

                </AlightRight> 

        </RSVPCard>
    </div>
  );
};
export default RSVPFloating;



