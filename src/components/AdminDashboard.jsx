import React, { useEffect, useState } from "react";
import { usePost } from "../contexts/PostContext";
import { firestore } from "../firebase";
import Category from "./Category";
import CreateCategory from "./CreateCategory";

export default function AdminDashboard() {
  const { categories, getCategoryFromDb } = usePost();
  const [showCategory, setShowCategory] = useState(false);

  // const [categories, setCategories] = useState([])
  // const [loading, setLoading] = useState(false);

  // const getCategoryFromDb = () => {
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
    getCategoryFromDb();
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
                <Category
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
