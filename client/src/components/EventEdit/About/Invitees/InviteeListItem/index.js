import React from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import { spacing8, spacing16 } from "../../../../../resources/style-constants";

const InviteeContainer = styled.div`
  height: 3.5vw;
  transform: scale(1, 1);
  border-bottom: 1px solid grey;
  padding: ${spacing8};
  :active {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.06), 0 6px 8px 0 rgba(0, 0, 0, 0.06);
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NameIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const PicStyle = styled.div`
  display: flex;
  padding-right: ${spacing16};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextBar = styled.div`
  font-size: 1.7vw;
`;

const ImgTrash = styled.div`
  position: absolute;
  right: 0;
  padding: 0 ${spacing16};
  :hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const InviteeListItem = ({
  person,
  person: { fullname },
  onDelete,
  ...props
}) => {
  return (
    <InviteeContainer {...props}>
      <NameIconWrapper>
        <PicStyle>
          <IconContext.Provider value={{ size: "2em" }}>
            <CgProfile />
          </IconContext.Provider>
        </PicStyle>
        <TextBar>{fullname}</TextBar>
      </NameIconWrapper>
      <IconContext.Provider value={{ color: "gray", size: "1.25em" }}>
        <ImgTrash>
          <FaTrash onClick={() => onDelete(person)} />
        </ImgTrash>
      </IconContext.Provider>
    </InviteeContainer>
  );
};
export default InviteeListItem;
