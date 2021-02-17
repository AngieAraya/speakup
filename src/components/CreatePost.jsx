import React, { useRef, useState } from 'react';
import {
   Container, Form, Input, Button, Header
} from "./styles/SignupFormStyle";
import { Alert } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { firestore } from "../firebase";


export default function CreatePost() {
  const titleRef = useRef();
  const textRef = useRef();
  const { currentUser, userDetail  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

   const handleSubmit =(e) => {
     e.preventDefault()
     savePostToDB(titleRef.current.value, textRef.current.value )
  }

  const savePostToDB = async (title, text) => {
    const db = await firestore;
    let id = Math.floor(Math.random() * 1000000)

    return db
      .collection("posts")
      .doc()
      .set({
        title,
        text,
        // date: db.Timestamp.fromDate(new Date()),
        userId: currentUser.uid,
        name: userDetail.name,
        id,
      })
      .then(() => {
        console.log("Document successfully written!");
        history.push("/profile")
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
  };

  return (
    <>
        <Container>
          <Header>Skapa inlägg</Header>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <label>Title</label>
              <Input
                type="text"
                ref={titleRef}
                required
                />
                <label>Text</label>
              <Input type="text" ref={textRef} required />
            <Button disabled={loading} type="submit">
              Lägg upp
            </Button>
          </Form>
          <Link to="/profile">Cancel</Link>
      </Container>
    </>
  )
}
