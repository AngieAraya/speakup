import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../firebase";

const PostContext = React.createContext();

export function usePost() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([])
  console.log("cat i context", categories);


  //obs lägg till loading!! ?
  // const [loading, setLoading] = useState(true);

  const getPostDetailFromDb = async (postId) => {
    const db = await firestore
    return db
      .collection("posts")
      .doc(postId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const getCategoryFromDb = async () => {
    const db = await firestore
    return db.collection("category").orderBy("date", "desc").onSnapshot((Snapshot) => {
        const categoryList = [];
        Snapshot.forEach((doc) => {
          categoryList.push(doc.data());
        });
        setCategories(categoryList);
      });
    };

    
  useEffect(() => {
    getCategoryFromDb();
  }, []);



  const value = {
    getPostDetailFromDb,
    comments,
    setComments,
    posts,
    setPosts,
    categories,
    setCategories,
    getCategoryFromDb,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
