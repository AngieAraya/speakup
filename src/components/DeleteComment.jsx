import React from "react";
import { usePost } from "../contexts/PostContext";
import { firestore } from "../firebase";

export default function DeleteComment({ postId, commentId }) {
  const { setComments } = usePost();  

  const deleteComment = () => {
    firestore
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .doc(commentId)
      .delete()
      .then(() => {
        console.log("COMMENT DELETED");
        setComments((prev) => {
           const newData = prev.filter(
            (comment) => comment.commentId !== commentId
          );
          //vrf behövs det returna?
          return newData;
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <>
      <button onClick={() => deleteComment()}>Radera</button>
    </>
  );
}
