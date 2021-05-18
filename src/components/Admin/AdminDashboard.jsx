import React, { useEffect, useState } from "react";
import { useCategory } from "../../contexts/CategoryContext";
import CategoryItem from "./CategoryItem";
import CreateCategory from "./CreateCategory";

export default function AdminDashboard() {
  const { getAllCategoriesFromDb, categories } = useCategory();
  const [showCategory, setShowCategory] = useState(false);
  useEffect(() => {
    getAllCategoriesFromDb();
  }, []);


  return (
    <div>
      <button onClick={() => setShowCategory(true)}>Kategorier</button>
      {showCategory && (
        <div>
          <CreateCategory />
          <ol>
            {categories &&
              categories.map((category) => (
                <CategoryItem
                  key={category.docId}
                  category={category}
                  id={category.docId}
                />
              ))}
          </ol>
          <button onClick={() => setShowCategory(false)}>Stäng</button>
        </div>
      )}
    </div>
  );
}
