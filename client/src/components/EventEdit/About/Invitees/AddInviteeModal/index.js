import React, { useState } from "react";
import styled from "styled-components";
import {
  spacing8,
  spacing16,
  spacing32
} from "../../../../../resources/style-constants";
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
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const PaddedButton = styled.div`
  padding-right: ${spacing8};
`;

const StyledInput = styled(Input)`
  padding: 1.75rem;
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
  const [apiStatus, setApiStatus] = useState({
    loading: false,
    error: false,
    message: ""
  });

  const changeHandler = (event) => {
    let value = event.target.value;
    setAddedPerson(value);
  };

  const searchPerson = (event) => {
    event.preventDefault();
    setApiStatus({ ...apiStatus, loading: true });
    let newApiStatus = { ...apiStatus };
    //TODO: call backend to get full name
    //TODO: if successful, then update person name.

    setPersonName("John Doe");
    newApiStatus.loading = false;

    setApiStatus(newApiStatus);
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
      let person = { name: personName, username: addedPerson };
      addPerson && addPerson(person);
    }
  };

  return (
    <Modal onClose={closeModal} open={modalOpened}>
      <Stack gapSize={spacing32}>
        <h2>{addTitle || "Add Person"}</h2>

        <div>{addPersonMessage || ""}</div>
        <form onSubmit={searchPerson}>
          <FormRow>
            <StyledInput
              name="invitee"
              placeholder="Enter a username or email"
              value={addedPerson}
              onChange={changeHandler}
            />
            <SearchWrapper>
              <PrimaryButton
                onClick={searchPerson}
                disabled={apiStatus.loading}
              >
                Search
              </PrimaryButton>
            </SearchWrapper>
          </FormRow>
        </form>
        {personName && <div>{personName}</div>}
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
