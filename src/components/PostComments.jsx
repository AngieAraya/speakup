import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import {
  CommentContainer,
} from "./styles/DetailPageStyle";
import { usePost } from "../contexts/PostContext";
import PostComment from "./PostComment";

export default function PostComments({ postId }) {
  const { comments, setComments } = usePost();

  // useEffect(() => {
  //   getCommentsFromDB(postId);
  // }, []);
  

  // till för snapshot som uppdaterar automatiskt
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
      {comments &&
        comments.map((comment) => (
          <PostComment key={comment.id} comment={comment} postId={postId} />
        ))}

    </CommentContainer>
  );
}
