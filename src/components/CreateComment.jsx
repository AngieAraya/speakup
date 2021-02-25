import React, { useRef, useState } from "react";
import { Form, Button, Textarea } from "./styles/FormStyle";
import { Alert } from "react-bootstrap";
import { firestore } from "../firebase";
import { useAuth } from "../contexts/AuthContext";


export default function CreateComment({ postId, setShowForm }) {
  const { currentUser, userDetail } = useAuth();
  const textRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckBox] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    saveCommentToDB(textRef.current.value);
    setShowForm(false);
  };

  const toggleCheckbox = () => {
    setCheckBox((prev) => !prev);
  };

  const saveCommentToDB = async (text) => {
    const db = await firestore;
    let id = Math.floor(Math.random() * 1000000);
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
        id,
      })
      .then((doc) => {
      db.collection("posts")
      .doc(postId)
      .collection("comment").doc(doc.id).update({
        docId: doc.id
       })
        // setComments((prev) => [
        //   ...prev,
        //   {
        //     commentId: doc.id,
        //     value: {
        //       text,
        //       date,
        //       userId: currentUser.uid,
        //       name: userDetail.name,
        //       anonymousPost: checkbox,
        //     },
        //   },
        // ]);

        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>
      <div>
        <h2>Lämna en kommentar</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <label>Text</label>
          <Textarea type="text" ref={textRef} required></Textarea>
          <label>Jag vill vara Anonym</label>
          <input type="checkbox" onClick={toggleCheckbox} />
          <Button disabled={loading} type="submit">
            skicka
          </Button>
        </Form>
      </div>
    </>
  );
}
