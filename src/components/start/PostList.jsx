import React, { useEffect, useState } from "react";
import {
  PostContainer,
} from "../styles/StartPageStyle";
import Post from "./Post";
import { usePost } from "../../contexts/PostContext";

export default function PostList() {
  const { getAllPostsFromDb, allPosts} = usePost()


  useEffect(() => {
    getAllPostsFromDb();
  }, []);


  return (
    <PostContainer>
      {allPosts && allPosts.map((post) => (
        <Post key={post.docId} post={post} />
      ))}
    </PostContainer>
  );
}
