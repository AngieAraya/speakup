import React, { useEffect, useState } from "react";
import { useCategory } from "../../contexts/CategoryContext";
import CategoryItem from "./CategoryItem";
import CreateCategory from "./CreateCategory";
import styled, { keyframes } from "styled-components";
import { CategoryBtn } from "../styles/Buttons";

export default function AdminDashboard() {
  const { getAllCategoriesFromDb, categories } = useCategory();
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    getAllCategoriesFromDb();
  }, []);

  return (
    <CategoryContainer>
      <CategoryBtn onClick={() => setIsopen(!isOpen)}>Kategorier</CategoryBtn>
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

export const CategoryWrapper = styled.div`
  animation: ${fadeIn} 1s linear;
  max-width: 265px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  margin-top: 17px;
  background: #f6f4f5de;
  box-shadow: 7px 5px 14px 2px rgb(0 0 0 / 10%);
  border-radius: 6px;
`;

export const Ol = styled.ol`
  padding-left: 17px;
`;
