import React from "react";
import { useCategory } from "../../contexts/CategoryContext";
import styled from "styled-components";
import { CreateCategoryBtn } from "../styles/Buttons";

export default function CreateCategory() {
  const { createCategory, setCreateCategory, createCategoryToDB } =
    useCategory();

  const handleCreateCategory = (e) => {
    e.preventDefault();
    createCategoryToDB();
  };

  return (
    <div>
      <StyledForm onSubmit={handleCreateCategory}>
        <Input
          type="text"
          value={createCategory}
          onChange={(e) => setCreateCategory(e.target.value)}
          required
          placeholder="skapa ny kategori"
        />
        <CreateCategoryBtn type="submit">Skapa</CreateCategoryBtn>
      </StyledForm>
    </div>
  );
}

export const StyledForm = styled.form`
  display: flex;
`;

export const Input = styled.input`
  border-radius: 6px;
  outline: none;
  padding: 5px;
  border: 1px solid purple;
`;
