import React from "react";
import { useCategory } from "../../contexts/CategoryContext";

export default function SelectCategories() {
  const { categories, setSelectedCategory, getSelectedCategory } = useCategory();

  const handleChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    getSelectedCategory(category);
  };

  return (
    <div>
      <select
        onChange={(e) => {
          handleChange(e);
        }}
      >
        <option value="" disabled selected hidden>Kategori</option>
        {categories &&
          categories.map((category) => (
            <option key={category.docId} value={category.category} placeholder="kategori">
              {category.category}
            </option>
          ))}
      </select>
    </div>
  );
}
