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







  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     console.log("user", user);
  //     setCurrentUser(user);
  //     setLoading(false);
  //     getUserData(user);
  //   });
  //   return unsubscribe;
  // }, []);

  const value = {
    comments, 
    setComments,
    posts,
    setPosts,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}
