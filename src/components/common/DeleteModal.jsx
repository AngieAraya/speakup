import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import DeletePost from "./DeletePost";
import * as S from "../styles/ModalStyle";
import styled from "styled-components";
import { Button } from "../styles/Buttons";

export default function DeleteModal({ setShowDeleteModal, postDocId, admin }) {
  return (
    <div>
      <S.Modal>
        <ModalContainer>
          <S.ModalCloseBtn>
            <AiOutlineClose onClick={() => setShowDeleteModal(false)} />
          </S.ModalCloseBtn>
          <ModalHeading>
            Är du säker på att du vill radera inlägget?
          </ModalHeading>{" "}
          <S.ModalButtonWrapper>
            <DeletePost postDocId={postDocId} admin={admin} />
            <Button onClick={() => setShowDeleteModal(false)}>Avbryt</Button>
          </S.ModalButtonWrapper>
        </ModalContainer>
      </S.Modal>
    </div>
  );
}

export const ModalContainer = styled.div`
  background: #eeeeee;
  width: 50%;
  margin: auto;
  border-radius: 10px;
  min-height: 14%;
  padding: 28px;
  text-align: center;
`;

export const ModalHeading = styled.h1`
  font-size: 24px;
  font-weight: 400;
`;
