import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { firestore } from "../firebase";
import { useAuth } from "./AuthContext";

const PostContext = React.createContext();

export function usePost() {
  return useContext(PostContext);
}

export function PostProvider({ children }) {
  const { currentUser, userDetail } = useAuth();
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [postDetail, setPostDetail] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const history = useHistory();

  // hämta alla posts
  const getAllPostsFromDb = () => {
    // setLoading(true);
    firestore
      .collection("posts")
      .orderBy("date", "desc")
      .onSnapshot((Snapshot) => {
        const postList = [];
        Snapshot.forEach((doc) => {
          postList.push(doc.data());
        });
        setAllPosts(postList);
        // setLoading(false);
      });
  };

  //Hämta specifikpost
  const getPostDetailFromDb = async (postId) => {
    const db = await firestore;
    return db
      .collection("posts")
      .doc(postId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setPostDetail(doc.data());
          // return doc.data();
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  //skapa en post
  const createPostToDB = async (title, text, category, checkbox) => {
    const db = await firestore;
    let id = Math.floor(Math.random() * 1000000);
    return db
      .collection("posts")
      .add({
        title,
        text,
        category,
        date: new Date(),
        userId: currentUser.uid,
        name: userDetail.name,
        anonymousPost: checkbox,
        id,
      })
      .then((doc) => {
        db.collection("posts").doc(doc.id).update({
          docId: doc.id,
        });
        console.log("Document successfully written!");
        history.push("/profile");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  //Uppdatera post
  const UpdatePost = (id, title, text, category, checkbox) => {
    firestore
      .collection("posts")
      .doc(id)
      .update({
        title,
        text,
        category,
        anonymousPost: checkbox,
      })
      .then(() => {
        history.push("/profile");
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  const value = {
    getPostDetailFromDb,
    comments,
    setComments,
    posts,
    setPosts,
    categories,
    setCategories,
    getAllPostsFromDb,
    UpdatePost,
    allPosts,
    createPostToDB,
    postDetail,
    setPostDetail,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}
