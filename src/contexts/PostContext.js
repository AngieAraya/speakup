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

const getPostFromDb = async (postId) =>{
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
}

const getCommentsFromDB = async (postId) => {
  const db = await firestore;
  return db
    .collection("posts")
    .doc(postId)
    .collection("comment")
    .orderBy("date","desc")
    .get()
    .then((snapShot) => {
        let items = [];
        snapShot.docs.forEach((doc) => {
          items.push(doc.data());
        });
        setComments(items);
        // setComments(items);
      })
    // .then((snapShot) => {
    //   let items = [];
    //   snapShot.docs.forEach((doc) => {
    //     items.push({ commentId: doc.id, value: doc.data() });
    //   });
    //   return items;
    //   // setComments(items);
    // })
    .catch((error) => {
      console.log("Error getting documents DASHBOARD: ", error);
    });
};


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
    getPostFromDb,
    getCommentsFromDB,
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
