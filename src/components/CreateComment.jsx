import React, { useRef, useState } from "react";
import { Button } from "./styles/FormStyle";
import { Alert } from "react-bootstrap";
import { firestore } from "../firebase";

export default function CreateComment({ postId, setShowForm }) {
  const titleRef = useRef();
  const textRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkbox, setCheckBox] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    savePostToDB(titleRef.current.value, textRef.current.value);
    setShowForm(false);
  };

  const toggleCheckbox = () => {
    setCheckBox((prev) => !prev);
  };

  const savePostToDB = async (title, text) => {
    const db = await firestore;
    let id = Math.floor(Math.random() * 1000000);
    return db
    .collection("posts")
    .doc(postId)
    .collection("comment")
    .doc()
    .set({
      title,
      text,
      // date: db.Timestamp.fromDate(new Date()),
      // userId: currentUser.uid,
      // name: userDetail.name,
      anonymousPost: checkbox,
      id,
    })
    .then(() => {
      console.log("reload true setLoadcoment true");

        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>
      <div>
        <h2>Skapa Kommentar</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" ref={titleRef} required />
          <label>Text</label>
          <input type="text" ref={textRef} required />
          <label>Jag vill vara Anonym</label>
          <input type="checkbox" onClick={toggleCheckbox} />
          <Button disabled={loading} type="submit">
            skicka
          </Button>
        </form>
      </div>
    </>
  );
}
