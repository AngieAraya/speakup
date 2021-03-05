import React, { useRef, useState } from "react";
import { Container, Form, Input, Button, Header } from "../styles/FormStyle";
import { LinkDiv, CancelLink, TextInput } from "../styles/ProfilePageStyle";
import { useCategory } from "../../contexts/CategoryContext";
import { usePost } from "../../contexts/PostContext";

export default function CreatePost() {
  const { createPostToDB } = usePost();
  const titleRef = useRef();
  const textRef = useRef();
  const { categories } = useCategory();
  const [category, setCategory] = useState("Annat");
  const [checkbox, setCheckBox] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostToDB(
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
        <Header>Skapa inlägg</Header>
        <Form onSubmit={handleSubmit}>
          <label>Title</label>
          <Input type="text" ref={titleRef} required />
          <label>Text</label>
          <TextInput type="text" ref={textRef} required></TextInput>
          <label>Välj kategori:</label>
          <select
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
          </select>
          <label>Jag vill vara Anonym</label>
          <input type="checkbox" onClick={toggleCheckbox} />
          <Button type="submit">Publicera</Button>
        </Form>
        <LinkDiv>
          <CancelLink to="/profile">Cancel</CancelLink>
        </LinkDiv>
      </Container>
    </>
  );
}
