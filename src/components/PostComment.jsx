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

export default function PostComment({ postId }) {
  const { userDetail } = useAuth();
  const { comments, setComments } = usePost();  

  const getCommentsFromDB = async () => {
    const db = await firestore;
    return db
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .get()
      .then((doc) => {
        const items = [];
        doc.forEach((doc) => {
          console.log("doc", doc.data());
          items.push({ commentId: doc.id, value: doc.data() });
        });
        setComments(items);
      })
      .catch((error) => {
        console.log("Error getting documents DASHBOARD: ", error);
      });
  };

  useEffect(() => {
    getCommentsFromDB();
  }, []);

  return (
    <CommentContainer>
      {comments && comments.map((comment) => (
        <CommentWrapper key={comment.commentId}>
          <Left>
            <div>
            {/* <span>{moment(comment.value.date.toDate()).startOf("minutes").fromNow()}</span> */}
              {/* {new Date(comment.value.date.seconds * 1000).toLocaleDateString()} */}
            </div>
          </Left>
          <Wrapper>
            <CommentedBy>
              {comment.value.anonymousPost ? (
                <span>Anonym</span>
              ) : (
                <span>{comment.value.name}</span>
              )}
            </CommentedBy>
            <p>{comment.value.text}</p>
          </Wrapper>
          {userDetail.uid == comment.value.userId && (
            <Left>
              <button>Modifiera</button>
              <DeleteComment postId={postId} commentId={comment.commentId} />
            </Left>
          )}
        </CommentWrapper>
      ))}
    </CommentContainer>
  );
}
