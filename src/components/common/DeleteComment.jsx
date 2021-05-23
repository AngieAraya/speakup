import React from "react";
import { firestore } from "../../firebase";
import { FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";

export default function DeleteComment({ postId, docId }) {
  const deleteComment = () => {
    firestore
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .doc(docId)
      .delete()
      .then(() => {
        console.log("COMMENT DELETED");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <>
      <BtnDeleteNoStyle onClick={() => deleteComment()}>
        <FaTrashAlt />
      </BtnDeleteNoStyle>
    </>
  );
}

export const BtnDeleteNoStyle = styled.button`
  border-block-end-style: none;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  &:hover {
    color: #ce2c2ce6;
  }
`;
