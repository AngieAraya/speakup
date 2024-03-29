import React, { useEffect } from "react";
import { firestore } from "../../../firebase";
import { usePost } from "../../../contexts/PostContext";
import PostComment from "./PostComment";
import { useAuth } from "../../../contexts/AuthContext";
import CreateComment from "./CreateComment";
import styled from "styled-components";

export default function PostCommentsList({ postId }) {
  const { currentUser } = useAuth();
  const { comments, setComments } = usePost();

  useEffect(() => {
    const unsubscribe = firestore
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setComments(data);
      });
    return () => unsubscribe();
  }, []);

  return (
    <CommentContainer>
      {currentUser && <CreateComment postId={postId} />}
      {comments &&
        comments.map((comment) => (
          <PostComment key={comment.docId} comment={comment} postId={postId} />
        ))}
    </CommentContainer>
  );
}

export const CommentContainer = styled.div`
  max-width: 93%;
  min-width: 50%;
  padding: 10px 0 80px;
  margin: 30px auto 0px;

  @media screen and (min-width: 700px) {
    max-width: 60%;
    padding: 70px 0;
  }
`;
