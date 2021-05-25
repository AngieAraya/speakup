import React from "react";
import { firestore } from "../firebase";
import { Container } from "../components/styles/DetailPageStyle";
import PostDetailItem from "../components/postDetails/PostDetailItem";

export default function DetailPostPage(props) {
  const postId = props.match.params.id;

  return (
    <Container>
      <PostDetailItem key={postId} postId={postId} />
    </Container>
  );
}
