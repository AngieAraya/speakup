import React from "react";
import { useCategory } from "../../contexts/CategoryContext";

export default function CreateCategory() {
  const {
    createCategory,
    setCreateCategory,
    createCategoryToDB,
  } = useCategory();

  const handleCreateCategory = (e) => {
    e.preventDefault();
    createCategoryToDB();
  };

  return (
    <div>
      <form onSubmit={handleCreateCategory}>
        <input
          type="text"
          value={createCategory}
          onChange={(e) => setCreateCategory(e.target.value)}
          required
          placeholder="skapa ny kategori"
        />
        <button type="submit">Skapa</button>
      </form>
    </div>
  );
}
