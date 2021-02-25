import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../firebase";
import { useAuth } from "./AuthContext";

const PostContext = React.createContext();

export function usePost() {
  return useContext(PostContext);
}


export function PostProvider({ children }) {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  // console.log("i context post cont",currentUser.uid);

  //obs lägg till loading!! ?
  // const [loading, setLoading] = useState(true);

const getPostDetailFromDb = async (postId) =>{
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

// const getCommentsFromDB = async (postId) => {
//   const db = await firestore;
//   return db
//     .collection("posts")
//     .doc(postId)
//     .collection("comment")
//     .orderBy("date","desc")
//     .get()
//     .then((snapShot) => {
//         let commentList = [];
//         snapShot.docs.forEach((doc) => {
//           commentList.push(doc.data());
//         });
//         setComments(commentList);
//       })
//     .catch((error) => {
//       console.log("Error getting documents DASHBOARD: ", error);
//     });
// };

// const getUsersPostsFromDb = async () => {
//   const db = await firestore;
//   return db
//     .collection("posts")
//     .where("userId", "==", currentUser.uid)
//     .orderBy("date","desc")
//     .get()
//     .then((snapshot) => {
//       const usersPosts = [];
//       snapshot.forEach((doc) => {
//         usersPosts.push(doc.data());
//         // usersPosts.push({ collectionId: doc.id, value: doc.data() });
//       });
//       console.log("user i funktion", usersPosts);
//       return usersPosts;
//     })
//     .catch((error) => {
//       console.log("Error getting documents DASHBOARD: ", error);
//     });
// };








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
    getPostDetailFromDb,
    // getCommentsFromDB,
    // getUsersPostsFromDb,
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
