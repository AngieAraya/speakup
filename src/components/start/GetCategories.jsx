import React, { useEffect, useState } from "react";
import { PostContainer } from "../styles/StartPageStyle";
import { useCategory } from "../../contexts/CategoryContext";
import { firestore } from "../../firebase";
import Post from "./Post";

export default function GetCategories() {
  const { posts, selectedCategory } = useCategory();

  return (
    <PostContainer>
      <h1>{selectedCategory}</h1>
      {posts.map((post) => (
        <Post key={post.docId} post={post} />
      ))}
    </PostContainer>
  );
}
