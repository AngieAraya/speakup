import React, { useState } from "react";
import { usePost } from "../contexts/PostContext";

export default function SelectCategories({ radio, setRadio }) {
  const { categories} = usePost();
  const [category, setCategory] = useState("familj");

  return (
    <div>
      <select
            onChange={(e) => {
              const selectCategory = e.target.value;
              setRadio(selectCategory);
            }}
      >
        {categories &&
          categories.map((category) => (
            <option key={category.docId} value={category.category}>
              {category.category}
            </option>
          ))}
      </select>
      {/* <h1>Kategori</h1>
      <label>Misshandel</label>
      <input
        type="radio"
        checked={radio === "Misshandel"}
        value="Misshandel"
        onChange={(e) => {
          setRadio(e.target.value);
        }}
      />
      <label>Rån</label>
      <input
        type="radio"
        checked={radio === "Rån"}
        value="Rån"
        onChange={(e) => {
          setRadio(e.target.value);
        }}
      />
      <label>Familj</label>
      <input
        type="radio"
        checked={radio === "Familj"}
        value="Familj"
        onChange={(e) => {
          setRadio(e.target.value);
        }}
      /> */}
    </div>
  );
}
