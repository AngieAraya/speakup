import React from "react";
import { useCategory } from "../../contexts/CategoryContext";
import styled from "styled-components";

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
        <Button type="submit">Skapa</Button>
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

export const Button = styled.button`
  letter-spacing: 1px;
  padding: 3px 55px;
  border: none;
  border-radius: 10px;
  background-color: rgb(185 146 215);
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
  justify-content: center;
  display: flex;
  width: 66px;
  padding: 6px 7px;
  margin-left: 10px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(159 118 190);
    color: white;
  }
`;
