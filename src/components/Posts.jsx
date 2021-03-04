import React, { useEffect, useState } from "react";
import {
  PostContainer,
} from "../components/styles/StartPageStyle";
import { firestore } from "../firebase";
import Post from "./Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPostsFromDb = () => {
    setLoading(true);
    firestore
      .collection("posts")
      .orderBy("date", "desc")
      .onSnapshot((Snapshot) => {
        const postList = [];
        Snapshot.forEach((doc) => {
          postList.push(doc.data());
        });
        setPosts(postList);
        setLoading(false);
      });
  };

  useEffect(() => {
    getPostsFromDb();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <PostContainer>
      {posts.map((post) => (
        <Post key={post.docId} post={post} />
      ))}
    </PostContainer>
  );
}
