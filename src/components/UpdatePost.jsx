import React, { useEffect, useRef, useState } from "react";
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
} from "../components/styles/ProfilePageStyle";
import { Alert } from "react-bootstrap";
import { firestore } from "../firebase";
import { useHistory } from "react-router-dom";

export default function UpdatePost({ id }) {
  console.log("upd", id);
  const [postDetail, setPostDetail] = useState(null);
  const [category, setCategory] = useState("familj");
  const [checkbox, setCheckBox] = useState(false);
  const titleRef = useRef();
  const textRef = useRef();
  const history = useHistory()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // if (postDetail) {
  //   console.log(postDetail);
  // }

  const getPost = () => {
    firestore
      .collection("posts")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setPostDetail(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  useEffect(() => {
    getPost();
  }, []);
  

  const handlePostUpdate = (e) => {
    e.preventDefault();
    console.log("handlepostuod");
    firestore
    .collection("posts")
    .doc(id)
    .update({
      title: titleRef.current.value,
      text: textRef.current.value,
      category,
      anonymousPost: checkbox,
    })
    .then(() => {
      history.push("/profile")
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
  };

  const toggleCheckbox = () => {
    setCheckBox(prev => !prev);
  };

  return (
    <>
      <Container>
        <Header>Uppdatera Post</Header>
        {error && <Alert variant="danger">{error}</Alert>}
        {postDetail && 
          <Form onSubmit={handlePostUpdate}>
            <label>Title</label>
            <Input
              type="text"
              ref={titleRef}
              defaultValue={postDetail.title}
              required
            />
            <label>Text</label>
            <Input type="text" ref={textRef} defaultValue={postDetail.text} />
            <label>Välj kategori:</label>
          <select defaultValue={postDetail.category} onChange={(e) => {
            const selectCategory = e.target.value
            setCategory(selectCategory)
          }}>
            <option value="Familj">Familj</option>
            <option value="Rån">Rån</option>
            <option value="Misshandel">Misshandel</option>
          </select>
          <label>Jag vill vara Anonym</label>
          <input type="checkbox" onClick={toggleCheckbox}/>
            <Button disabled={loading} required type="submit">
              uppdatera
            </Button>

          </Form>
        }
         <LinkDiv> 
        <CancelLink to="/profile">Cancel</CancelLink>
        </LinkDiv>
      </Container>
    </>
  );
}
