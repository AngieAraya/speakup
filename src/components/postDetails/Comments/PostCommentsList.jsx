import React, { useEffect, useState } from "react";
import { firestore } from "../../../firebase";
import { usePost } from "../../../contexts/PostContext";
import PostComment from "./PostComment";
import { useAuth } from "../../../contexts/AuthContext";
import CreateComment from "./CreateComment";
import styled from "styled-components";

export const CommentContainer = styled.div`
max-width: 93%;
min-width: 50%;
padding: 10px 0 80px;
margin: 70px auto 0px;
// max-width: 60%;
// min-width: 50%;
// padding: 10px;
// margin: 70px auto 60px;
  @media screen and (min-width: 700px) {
    max-width: 60%;
    padding: 80px 0;

    // min-width: 50%;
  }
`;
//vad är det här för sida?
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
          //tog bort id och bytte mot docId får då "each child..."
          <PostComment key={comment.docId} comment={comment} postId={postId} />
        ))}
    </CommentContainer>
  );
}
