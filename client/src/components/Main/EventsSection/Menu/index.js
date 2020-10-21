import React, { useState } from "react";
import styled from "styled-components";
import { Menu, MenuItem } from "@material-ui/core";
import { grey3 } from "../../../../resources/style-constants";

const Wrapper = styled.div`
  z-index: 2;
  position: absolute;
  height: 100%;
`;

const SvgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 30px;
  height: 50px;
  top: 0;
  right: 0;
`;

const StyledSvg = styled.svg`
  fill: black;
  viewbox: 0 0 50 100;
  width: 100%;
  height: 100%;
  &:hover {
    fill: ${grey3};
  }
  transition: 0.3s;
`;

const EventMenu = ({ event, items = [], ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Wrapper {...props}>
      <SvgWrapper>
        <StyledSvg onClick={handleClick} xmlns="http://www.w3.org/2000/svg">
          <g transform="scale(1.5)">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </g>
        </StyledSvg>
      </SvgWrapper>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item, index) => {
          return (
            <MenuItem onClick={() => item.onClick(event)} key={index}>
              {item.text}
            </MenuItem>
          );
        })}
      </Menu>
    </Wrapper>
  );
};

export default EventMenu;
