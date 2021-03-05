import React, { useEffect, useState } from "react";
import { PostContainer } from "../components/styles/StartPageStyle";
import { firestore } from "../firebase";
import Post from "./Post";

export default function GetCategories({ radio, posts }) {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const handleGetCategory = () => {
  //   setLoading(true);
  //   firestore
  //     .collection("posts")
  //     .where("category", "==", radio)
  //     .get()
  //     .then((querySnapshot) => {
  //       const items = [];
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.data());
  //         items.push(doc.data());
  //       });
  //       setPosts(items);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log("Error getting documents DASHBOARD: ", error);
  //     });
  // };

  // useEffect(() => {
  //   handleGetCategory();
  // }, [radio]);

  // if (loading) {
  //   return <h1>Loading...</h1>;
  // }

  return (
    <PostContainer>
      <h1>{radio}</h1>
      {posts.map((post) => (
        <Post key={post.docId} post={post} />
      ))}
    </PostContainer>
  );
}
