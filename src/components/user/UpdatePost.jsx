import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Input, Button, Header } from "../styles/FormStyle";
import { Alert } from "react-bootstrap";
import { usePost } from "../../contexts/PostContext";
import { useCategory } from "../../contexts/CategoryContext";
import { Link } from 'react-router-dom';

import styled from "styled-components";

export const LinkDiv = styled.div`
  text-align: center;
`;

export const UpdateLink = styled(Link)`
letter-spacing: 1px;
padding: 3px 55px;
border: none;
border-radius: 10px;
background-color: #38a1bd;
color: rgb(255, 255, 255);
cursor: pointer;
transition: all 0.3s ease 0s;
box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
&:hover {
  transition: all 0.2s ease-in-out;
  background-color: #06b9e8;
  color: white;
  text-decoration: none;
}
`;


export const CreateNewPostLink = styled(UpdateLink)`
background-color: #38a1bd;
&:hover {
  background-color: #06b9e8;
}
`;

export const CancelLink = styled(CreateNewPostLink)`
background-color: #38a1bd;
&:hover {
  background-color: #06b9e8;
}
`;


export default function UpdatePost({ id }) {
  const { getPostDetailFromDb, postDetail, UpdatePost } = usePost();
  const { categories } = useCategory();
  const [category, setCategory] = useState("familj");
  const [checkbox, setCheckBox] = useState(false);
  const titleRef = useRef();
  const textRef = useRef();
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
