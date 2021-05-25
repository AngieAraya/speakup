import React from "react";
import { firestore } from "../../firebase";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

export default function CategoryItem({ category, id }) {
  const handleDeleteCategory = () => {
    firestore
      .collection("categories")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  return (
    <LiWrapper>
      <li>{category.category}</li>
      <BtnDeleteNoStyle onClick={() => handleDeleteCategory()}>
        <FaTrashAlt />
      </BtnDeleteNoStyle>
    </LiWrapper>
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

export const LiWrapper = styled.div`
  display: flex;
  max-width: 170px;
  justify-content: space-between;
  margin: 13px 5px;
  padding: 5px;
`;
