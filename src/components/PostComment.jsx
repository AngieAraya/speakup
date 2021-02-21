import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { CommentWrapper } from "./styles/DetailPageStyle";

export default function PostComment({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCommentsFromDB = () => {
    setLoading(true);
    firestore
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .get()
      .then((doc) => {
        const items = [];
        console.log("doc exist");
        doc.forEach((doc) => {
          items.push({ commentId: doc.id, value: doc.data() });
          setComments(items);
        });
        setLoading(false);
      });
    };
    
    useEffect(() => {
    getCommentsFromDB();
  },[]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {comments.map((comment) => (
        <div key={comment.commentId}>
          <CommentWrapper>
            <span>Namn</span>
            <p>{comment.value.text}</p>
          </CommentWrapper>
        </div>
      ))}
    </>
  );
}