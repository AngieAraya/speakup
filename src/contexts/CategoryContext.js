import React, { useContext, useState, useEffect } from "react";
import { firestore } from "../firebase";

const CategoryContext = React.createContext();

export function useCategory() {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [createCategory, setCreateCategory] = useState("");


  //Hämtar alla kategorier
  const getAllCategoriesFromDb = async () => {
    const db = await firestore;
    return db
      .collection("categories")
      .orderBy("date", "desc")
      .onSnapshot((Snapshot) => {
        const categoryList = [];
        Snapshot.forEach((doc) => {
          categoryList.push(doc.data());
        });
        setCategories(categoryList);
      });
  };

  //Hämtar den valda kategorin
  const getSelectedCategory = (category) => {
    setLoading(true);
    firestore
      .collection("posts")
      .where("category", "==", category)
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          items.push(doc.data());
        });
        setPosts(items);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting documents DASHBOARD: ", error);
      });
  };

  const createCategoryToDB = async () => {
    const db = await firestore;
    return db
      .collection("categories")
      .add({
        category: createCategory,
        date: new Date(),
      })
      .then((doc) => {
        db.collection("categories").doc(doc.id).update({
          docId: doc.id,
        });
        setCreateCategory("");
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };



  useEffect(() => {
    getAllCategoriesFromDb();
  }, []);

  const value = {
    getAllCategoriesFromDb,
    getSelectedCategory,
    categories,
    setCategories,
    posts,
    setPosts,
    selectedCategory,
    setSelectedCategory,
    createCategory,
    setCreateCategory,
    createCategoryToDB,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}
