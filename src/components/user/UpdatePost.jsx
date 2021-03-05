import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Input, Button, Header } from "../styles/FormStyle";
import { LinkDiv, CancelLink } from "../styles/ProfilePageStyle";
import { Alert } from "react-bootstrap";
import { firestore } from "../../firebase";
import { useHistory } from "react-router-dom";
import { usePost } from "../../contexts/PostContext";
import { useCategory } from "../../contexts/CategoryContext";

export default function UpdatePost({ id }) {
  const { getPostDetailFromDb, postDetail, UpdatePost } = usePost();
  const { categories } = useCategory();
  const [category, setCategory] = useState("familj");
  const [checkbox, setCheckBox] = useState(false);
  const titleRef = useRef();
  const textRef = useRef();
  const history = useHistory();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPostDetailFromDb(id);
  }, []);

  const handlePostUpdate = (e) => {
    e.preventDefault();
    UpdatePost(
      id,
      titleRef.current.value,
      textRef.current.value,
      category,
      checkbox
    );
  };

  const toggleCheckbox = () => {
    setCheckBox((prev) => !prev);
  };

  return (
    <>
      <Container>
        <Header>Uppdatera Post</Header>
        {error && <Alert variant="danger">{error}</Alert>}
        {postDetail && (
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
            <select
              defaultValue={postDetail.category}
              onChange={(e) => {
                const selectCategory = e.target.value;
                setCategory(selectCategory);
              }}
            >
              {categories &&
                categories.map((category) => (
                  <option key={category.docId} value={category.category}>
                    {category.category}
                  </option>
                ))}
              {/* <option value="Familj">Familj</option>
            <option value="Rån">Rån</option>
            <option value="Misshandel">Misshandel</option> */}
            </select>
            <label>Jag vill vara Anonym</label>
            <input type="checkbox" onClick={toggleCheckbox} />
            <Button disabled={loading} required type="submit">
              uppdatera
            </Button>
          </Form>
        )}
        <LinkDiv>
          <CancelLink to="/profile">Cancel</CancelLink>
        </LinkDiv>
      </Container>
    </>
  );
}
