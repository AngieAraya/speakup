import React, { useState } from "react";
import { firestore } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 29px;

  @media screen and (min-width: 550px) {
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
    margin-bottom: 22px;
  }
`;
export const Textarea = styled.textarea`
  border-radius: 7px;
  rezise: non;
  resize: none;
  padding: 7px;
  outline: none;
  @media screen and (min-width: 550px) {
    width: 45%;
  }
`;

export default function CreateComment({ postId }) {
  const { currentUser, userDetail } = useAuth();
  //loading?
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [checkbox, setCheckBox] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveCommentToDB(text);
    console.log("handle submitt");
    setCheckBox(false);
    setText("");
  };

  const toggleCheckbox = () => {
    setCheckBox((prev) => !prev);
  };

  const saveCommentToDB = async (text) => {
    const db = await firestore;
    // let id = Math.floor(Math.random() * 1000000);
    const date = new Date();
    return db
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .add({
        text,
        date,
        userId: currentUser.uid,
        name: userDetail.name,
        anonymousPost: checkbox,
        // id,
      })
      .then((doc) => {
        db.collection("posts")
          .doc(postId)
          .collection("comment")
          .doc(doc.id)
          .update({
            docId: doc.id,
          });
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Textarea
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Lämna en kommentar..."
          required
        ></Textarea>
        <div>
          <label>Jag vill vara Anonym</label>
          <input type="checkbox" value={checkbox} onClick={toggleCheckbox} />
        </div>
        <Button disabled={loading} type="submit">
          skicka
        </Button>
      </Form>
    </>
  );
}

export const Button = styled.button`
  letter-spacing: 1px;
  padding: 3px 55px;
  border: none;
  border-radius: 10px;
  background-color: rgb(185 146 215);
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: all 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
  justify-content: center;
  display: flex;
  width: 66px;
  padding: 6px 7px;
  margin-left: 10px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(159 118 190);
    color: white;
  }
`;
