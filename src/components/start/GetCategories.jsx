import React from "react";
import { useCategory } from "../../contexts/CategoryContext";
import Post from "./Post";
import styled from "styled-components";

export const PostContainer = styled.div`
  padding: 40px;
`;

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
