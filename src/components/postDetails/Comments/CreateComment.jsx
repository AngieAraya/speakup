import React, { useState } from "react";
import { firestore } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import styled from "styled-components";
import { CreateCommentBtn } from "../../styles/Buttons";

export default function CreateComment({ postId }) {
  const { currentUser, userDetail } = useAuth();
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
        <CreateCommentBtn disabled={loading} type="submit">
          skicka
        </CreateCommentBtn>
      </Form>
    </>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 29px;
  max-width: 550px;
  margin: 0 auto 40px;
  @media screen and (min-width: 550px) {
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
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
