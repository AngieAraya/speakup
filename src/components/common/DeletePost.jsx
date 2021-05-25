import React from "react";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase";
import { DeleteBtn } from "../styles/Buttons"

export default function DeletePost({ postDocId, admin }) {
  const history = useHistory();

  const handleDelete = () => {
    firestore
      .collection("posts")
      .doc(postDocId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        if (admin) {
          history.push("/start");
        }
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  return (
    <>
      <DeleteBtn onClick={() => handleDelete()}>Ta bort</DeleteBtn>
    </>
  );
}
