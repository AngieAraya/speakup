import React, { useState } from "react";
import { usePost } from "../contexts/PostContext";
import { firestore } from "../firebase";

export default function SelectCategories({ setRadio, setPosts, radio }) {
  const { categories } = usePost();
  const [loading, setLoading] = useState(false);


  const handleGetCategory = (radio) => {
    setLoading(true);
    firestore
      .collection("posts")
      .where("category", "==", radio)
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          items.push(doc.data());
        });
        setPosts(items);
        setLoading(false);
        console.log("items",items);
      })
      .catch((error) => {
        console.log("Error getting documents DASHBOARD: ", error);
      });
  };

  const handleChange = (e) => {
    const selectCategory = e.target.value;
    setRadio(selectCategory);
    handleGetCategory(selectCategory);
  };

  return (
    <div>
      <select
        onChange={(e) => {
          handleChange(e);
          // const selectCategory = e.target.value;
          // setRadio(selectCategory);
        }}
      >
        {categories &&
          categories.map((category) => (
            <option key={category.docId} value={category.category}>
              {category.category}
            </option>
          ))}
      </select>
    </div>
  );
}
