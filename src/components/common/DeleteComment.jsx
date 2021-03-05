import React from "react";
import { firestore } from "../../firebase";

export default function DeleteComment({ postId, docId }) {
  
  const deleteComment = () => {
    firestore
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .doc(docId)
      .delete()
      .then(() => {
        console.log("COMMENT DELETED");
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
