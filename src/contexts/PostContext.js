import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../firebase";

const PostContext = React.createContext();

export function usePost() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
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

  const value = {
    getPostDetailFromDb,
    comments,
    setComments,
    posts,
    setPosts,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
