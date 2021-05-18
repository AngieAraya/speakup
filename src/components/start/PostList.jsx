import React, { useEffect } from "react";
import Post from "./Post";
import { usePost } from "../../contexts/PostContext";
import styled from "styled-components";

export const PostContainer = styled.div`
  padding: 40px;
`;

export default function PostList() {
  const { getAllPostsFromDb, allPosts } = usePost();

  useEffect(() => {
    getAllPostsFromDb();
  }, []);

  return (
    <PostContainer>
      {allPosts &&
        allPosts.map((post) => <Post key={post.docId} post={post} />)}
    </PostContainer>
  );
}
