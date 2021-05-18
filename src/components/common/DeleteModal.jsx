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

export default function DeleteModal({setShowDeleteModal, postDocId, admin}) {
  return (
    <div>
      <Modal>
        <ModalContainer>
          <ModalCloseBtn>
            <AiOutlineClose onClick={() => setShowDeleteModal(false)} />
          </ModalCloseBtn>
          <h1>Är du säker på att du vill radera inlägget?</h1>{" "}
          <DeletePost postDocId={postDocId} admin={admin} />
          <button onClick={() => setShowDeleteModal(false)}>Avbryt</button>
        </ModalContainer>
      </Modal>
    </div>
  );
}
