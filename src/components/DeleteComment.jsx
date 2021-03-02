import React from "react";
import { usePost } from "../contexts/PostContext";
import { firestore } from "../firebase";

export default function DeleteComment({ postId, docId }) {
  const { setComments } = usePost();  
  // console.log("post id delete", postId);

  const deleteComment = () => {
    firestore
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .doc(docId)
      .delete()
      .then(() => {
        console.log("COMMENT DELETED");
        // setComments((prev) => {
        //    const newData = prev.filter(
        //     (comment) => comment.commentId !== commentId
        //   );
        //   //vrf behövs det returna?
        //   return newData;
        // });
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
