import React, { useState } from "react";
import styled from "styled-components";
import { spacing8, spacing16 } from "../../../../../resources/style-constants";
import Input from "../../../../Common/Input";
import Modal from "../../../../Common/Modal";
import PrimaryButton from "../../../../Common/Buttons/PrimaryButton";
import SecondaryButton from "../../../../Common/Buttons/SecondaryButton";
import Stack from "../../../../Common/Stack";
const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchWrapper = styled.div`
  padding-left: ${spacing16};
  margin: ${spacing16} 0;
  // padding: ${spacing8} 0 ${spacing8} ${spacing16};
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const PaddedButton = styled.div`
  padding-right: ${spacing8};
`;

const AddInviteeModal = ({
  addPerson,
  addPersonMessage,
  addTitle,
  modalOpened,
  setModalOpened
}) => {
  const [addedPerson, setAddedPerson] = useState("");
  const [personName, setPersonName] = useState("");

  const changeHandler = (event) => {
    let value = event.target.value;
    setAddedPerson(value);
  };

  const searchPerson = (event) => {
    event.preventDefault();
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  const handleCancel = () => {
    setPersonName("");
    setAddedPerson("");

    setModalOpened(false);
  };

  const handleAdd = () => {
    if (personName !== "") {
      addPerson && addPerson(personName);
    }
  };

  return (
    <Modal onClose={closeModal} open={modalOpened}>
      <Stack>
        <h3>{addTitle || "Add Person"}</h3>

        <div>{addPersonMessage || ""}</div>
        <form onSubmit={searchPerson}>
          <FormRow>
            <Input
              name="invitee"
              placeholder="Enter a username or email"
              value={addedPerson}
              onChange={changeHandler}
            />
            <SearchWrapper>
              <PrimaryButton onClick={searchPerson}>Search</PrimaryButton>
            </SearchWrapper>
          </FormRow>
        </form>
        <ButtonRow>
          <PaddedButton>
            <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
          </PaddedButton>

          <PrimaryButton onClick={handleAdd}>Add</PrimaryButton>
        </ButtonRow>
      </Stack>
    </Modal>
  );
};

export default AddInviteeModal;
