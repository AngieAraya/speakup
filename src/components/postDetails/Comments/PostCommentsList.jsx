import React, { useEffect, useState } from "react";
import { firestore } from "../../../firebase";
import { CommentContainer } from "../../styles/DetailPageStyle";
import { usePost } from "../../../contexts/PostContext";
import PostComment from "./PostComment";
import { useAuth } from "../../../contexts/AuthContext";
import CreateComment from "./CreateComment";

export default function PostCommentsList({ postId }) {
  const { currentUser, userDetail } = useAuth();

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
      {currentUser && (
        <CreateComment postId={postId}/>
      )}
      {comments &&
        comments.map((comment) => (
          //tog bort id och bytte mot docId får då "each child..."
          <PostComment key={comment.docId} comment={comment} postId={postId} />
        ))}
    </CommentContainer>
  );
}
