import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";
import {
  CommentWrapper,
  CommentContainer,
  Wrapper,
  CommentedBy,
  Left,
} from "./styles/DetailPageStyle";
import DeleteComment from "./DeleteComment";
import { usePost } from "../contexts/PostContext";
import UpdateComment from "./UpdateComment";
import UpdateProfile from "./UpdateProfile";
import PostComment from "./PostComment";

export default function PostComments({ postId }) {
  const { comments, getCommentsFromDB, setComments } = usePost();

  useEffect(() => {
    getCommentsFromDB(postId);
  }, []);
  

  // till för snapshot som uppdaterar automatiskt
  useEffect(() => {
    const unsubscribe = firestore
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
        console.log("data upd", snapshot);
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
