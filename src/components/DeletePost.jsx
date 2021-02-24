import React from "react";
import { ButtonDelete } from "../components/styles/ProfilePageStyle";
import { usePost } from "../contexts/PostContext";
import { firestore } from "../firebase";

export default function DeletePost({ collectionId }) {
  const { setPosts } = usePost();  

  // console.log("postid",id);
  const handleDelete = () => {
    firestore
      .collection("posts")
      .doc(collectionId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        setPosts((prev) => {
          const newPostData = prev.filter(
           (post) => post.collectionId !== collectionId
         );
         console.log(newPostData);
         //vrf behövs det returna?
         return newPostData;
       });
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
