import React from "react";
import { useHistory } from "react-router-dom";
import { ButtonDelete } from "../../components/styles/ProfilePageStyle";
import { firestore } from "../../firebase";

export default function DeletePost({ postDocId, admin }) {
  const history = useHistory()

  const handleDelete = () => {
    firestore
      .collection("posts")
      .doc(postDocId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        if(admin){
          history.push("/start")
        }
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
