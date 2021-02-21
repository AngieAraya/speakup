import React from "react";
import { ButtonDelete } from "../components/styles/ProfilePageStyle";
import { firestore } from "../firebase";

export default function DeletePost({ id, setDeleted }) {
  const handleDelete = () => {
    console.log(id);
    firestore
      .collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        setDeleted(true);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  return (
    <>
      <ButtonDelete onClick={() => handleDelete(id)}>Ta bort</ButtonDelete>
    </>
  );
}
