import React from "react";
import { ButtonDelete } from "../components/styles/ProfilePageStyle";
import { firestore } from "../firebase";

export default function DeletePost({ postDocId }) {
  const handleDelete = () => {
    firestore
      .collection("posts")
      .doc(postDocId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  return (
    <>
      <ButtonDelete onClick={() => handleDelete()}>Ta bort</ButtonDelete>
    </>
  );
}
