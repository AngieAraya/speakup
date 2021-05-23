import React, { useEffect, useState } from "react";
import { useCategory } from "../../contexts/CategoryContext";
import CategoryItem from "./CategoryItem";
import CreateCategory from "./CreateCategory";
import styled, { keyframes } from "styled-components";

export default function AdminDashboard() {
  const { getAllCategoriesFromDb, categories } = useCategory();
  // const [showCategory, setShowCategory] = useState(false);
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    getAllCategoriesFromDb();
  }, []);

  return (
    <CategoryContainer>
      <Button onClick={() => setIsopen(!isOpen)}>Kategorier</Button>
      {isOpen && (
        <CategoryWrapper>
          <CreateCategory />
          <Ol>
            {categories &&
              categories.map((category) => (
                <CategoryItem
                  key={category.docId}
                  category={category}
                  id={category.docId}
                />
              ))}
          </Ol>
          {/* <button onClick={() => setShowCategory(false)}>Stäng</button> */}
        </CategoryWrapper>
      )}
    </CategoryContainer>
  );
}
const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const CategoryContainer = styled.div`
margin-top: 30px;

`;

export const Button = styled.button`
  letter-spacing: 1px;
  gap: 5px;
  padding: 3px 55px;
  border: none;
  border-radius: 10px;
  background-color: rgb(119 150 207);
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
    background-color: rgb(137 169 230);
    color: white;
  }
`;

export const CategoryWrapper = styled.div`
  animation: ${fadeIn} 1s linear;
  max-width: 265px;
  display: flex;
  flex-direction: column;
  // text-align: center;
  padding: 24px;
  margin-top: 17px;
  background: #f6f4f5de;
  box-shadow: 7px 5px 14px 2px rgb(0 0 0 / 10%);
  border-radius: 6px;
`;

export const Ol = styled.ol`
  padding-left: 17px;
`;
