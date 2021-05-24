import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import DeletePost from "./DeletePost";
import styled from "styled-components";

export const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  display: flex;
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const ModalContainer = styled.div`
  background: #eeeeee;
  width: 50%;
  margin: auto;
  border-radius: 10px;
  min-height: 14%;
  padding: 28px;
  text-align: center;
`;
export const ModalCloseBtn = styled.div`
  text-align: right;
  cursor: pointer;
  &:hover {
    color: #4e746a;
  }
`;

export const ModalHeading = styled.h1`
  font-size: 24px;
  font-weight: 400;
`;

export const Button = styled.button`
  letter-spacing: 1px;
  gap: 5px;
  padding: 3px 55px;
  border: none;
  border-radius: 10px;
  background-color: rgb(119 207 191);
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
  justify-content: center;
  display: flex;
  width: 130px;
  padding: 6px 7px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(79 176 159);
    color: white;
  }
`;

export const ModalButtonWrapper = styled.div`
display: flex;
justify-content: space-around;
width: 320px;
margin: 40px auto 10px;
`;

export default function DeleteModal({ setShowDeleteModal, postDocId, admin }) {
  return (
    <div>
      <Modal>
        <ModalContainer>
          <ModalCloseBtn>
            <AiOutlineClose onClick={() => setShowDeleteModal(false)} />
          </ModalCloseBtn>
          <ModalHeading>
            Är du säker på att du vill radera inlägget?
          </ModalHeading>{" "}
          <ModalButtonWrapper>
            <DeletePost postDocId={postDocId} admin={admin} />
            <Button onClick={() => setShowDeleteModal(false)}>Avbryt</Button>
          </ModalButtonWrapper>
        </ModalContainer>
      </Modal>
    </div>
  );
}
