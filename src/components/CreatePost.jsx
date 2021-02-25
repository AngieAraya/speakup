import React, { useRef, useState } from "react";
import {
  Container,
  Form,
  Input,
  Button,
  Header,
} from "./styles/FormStyle";
import {
  LinkDiv,
  CancelLink,
  TextInput,
} from "../components/styles/ProfilePageStyle";
import { Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { firestore } from "../firebase";

export default function CreatePost() {
  const titleRef = useRef();
  const textRef = useRef();
  const { currentUser, userDetail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Familj");
  const [checkbox, setCheckBox] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    savePostToDB(titleRef.current.value, textRef.current.value);
  };

  const toggleCheckbox = () => {
    setCheckBox(prev => !prev);
  };

  const savePostToDB = async (title, text) => {
    const db = await firestore;
    let id = Math.floor(Math.random() * 1000000);
    return db
      .collection("posts")
      .doc()
      .set({
        title,
        text,
        category,
        date: new Date(),
        userId: currentUser.uid,
        name: userDetail.name,
        anonymousPost: checkbox,
        id,
      })
      .then(() => {
        console.log("Document successfully written!");
        history.push("/profile");
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
          <Input type="text" ref={titleRef} required />
          <label>Text</label>
          <TextInput type="text" ref={textRef} required ></TextInput>
          <label>Välj kategori:</label>
          <select onChange={(e) => {
            const selectCategory = e.target.value;
            setCategory(selectCategory)
          }}>
            <option value="Familj">Familj</option>
            <option value="Rån">Rån</option>
            <option value="Misshandel">Misshandel</option>
          </select>
          <label>Jag vill vara Anonym</label>
          <input type="checkbox" onClick={toggleCheckbox}/>
          <Button disabled={loading} type="submit">
            Publicera
          </Button>
        </Form>
        <LinkDiv> 
        <CancelLink to="/profile">Cancel</CancelLink>
        </LinkDiv>
      </Container>
    </>
  );
}
