import React from "react";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import { borderRadius, spacing32 } from "../../../resources/style-constants";

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: ${({ width }) => (width ? `${width}` : "500px")};
  height: auto;
  border-radius: ${borderRadius};
  padding: ${spacing32};
  &:focus {
    outline: none;
  }
`;

const CustomModal = ({ open, onClose, width, children }) => {
  return (
    <StyledModal {...{ open, onClose }} width={width}>
      <Body>{children}</Body>
    </StyledModal>
  );
};

export default CustomModal;
