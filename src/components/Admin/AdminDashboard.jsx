import React, { useEffect, useState } from "react";
import { usePost } from "../../contexts/PostContext";
import { useCategory } from "../../contexts/CategoryContext";
import { firestore } from "../../firebase";
import CategoryItem from "./CategoryItem";
import CreateCategory from "./CreateCategory";

export default function AdminDashboard() {
  // const { categories } = usePost();
  const { getAllCategoriesFromDb, categories } = useCategory();
  const [showCategory, setShowCategory] = useState(false);

  // const [categories, setCategories] = useState([])
  // const [loading, setLoading] = useState(false);

  // const getAllCategoriesFromDb = () => {
  //   setLoading(true);
  //     firestore.collection("category").onSnapshot((Snapshot) => {
  //       const categoryList = [];
  //       Snapshot.forEach((doc) => {
  //         categoryList.push(doc.data());
  //       });
  //       setCategories(categoryList);
  //       setLoading(false);
  //     });
  //   };

  useEffect(() => {
    getAllCategoriesFromDb();
  }, []);

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

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
