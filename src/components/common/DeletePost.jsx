import React from "react";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase";
import styled from "styled-components";

export const Button = styled.button`
letter-spacing: 1px;
padding: 3px 55px;
border: none;
border-radius: 10px;
background-color: rgb(94 60 128);
color: rgb(255, 255, 255);
cursor: pointer;
transition: all 0.3s ease 0s;
box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
&:hover {
  transition: all 0.2s ease-in-out;
  background-color: rgb(141 75 206);
  color: white;
}
`;

export const ButtonDelete = styled(Button)`
background-color: darkred;
&:hover {
  background-color: red;
  color: white;
}
`;

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
