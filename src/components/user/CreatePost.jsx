import React, { useRef, useState } from "react";
import styled from "styled-components";
// import { Container, Form, Input, Button, Header } from "../styles/FormStyle";
import { LinkDiv, CancelLink } from "../styles/ProfilePageStyle";
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
    <div>
      <Header>Skapa inlägg</Header>
      <LinkDiv>
        <CancelLink to="/profile">Avbryt</CancelLink>
      </LinkDiv>
      <Container>
        <Form onSubmit={handleSubmit}>
          <TextWrapper>
            <Wrapper>
              <TitleWrapper>
                <label>Title</label>
                <br />
                <Input type="text" ref={titleRef} required />
              </TitleWrapper>
              <div>
                <label>Välj kategori:</label>
                <br />
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
              </div>
            </Wrapper>
            <label>Text</label>
            <TextInput type="text" ref={textRef} required></TextInput>
          </TextWrapper>
          <BtnAndInputWrapper>
            <AnonymousCheck>
              <AnonymousLabel>Jag vill vara Anonym</AnonymousLabel>
              <input type="checkbox" onClick={toggleCheckbox} />
            </AnonymousCheck>
            <Button type="submit">Publicera</Button>
          </BtnAndInputWrapper>
        </Form>
      </Container>
    </div>
  );
}

export const Container = styled.div`
  // background: orange;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // height: 80vh;
`;
export const Wrapper = styled.div`
  margin-bottom: 17px;
  @media (min-width: 550px) {
    display: flex;
    justify-content: space-between;
  }
`;
export const TitleWrapper = styled.div`
  width: 60%;
`;

export const AnonymousLabel = styled.label`
  margin-right: 8px;
`;

export const AnonymousCheck = styled.div`
  margin-top: 19px;
`;
export const BtnAndInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

// export const StyledSelect = styled.div`
//   border-radius: 6px;
//   padding: 4px;
//   border: 1px solid purple;
//   width: 163px;
// `;

export const Form = styled.form`
  background: pink;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // margin: 20px auto;
  // min-width: 40%;
  // align-items: center;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  margin: auto;
  max-width: 711px;
  max-width: 655px;
  background: #f6f4f5de;
  box-shadow: 7px 5px 14px 2px rgb(0 0 0 / 10%);
  border-radius: 6px;
`;

export const Input = styled.input`
  border-radius: 6px;
  outline: none;
  padding: 5px;
  width: 100%;
  border: 1px solid purple;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  // max-width: 620px;
  // margin: 0 70px;
`;

export const Header = styled.h1`
  text-align: center;
`;

export const Button = styled.button`
  letter-spacing: 1px;
  border: none;
  border-radius: 10px;
  padding: 6px 26px;
  background-color: rgb(94 60 128);
  color: rgb(255, 255, 255);
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 10px;
  width: 35%;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(141 75 206);
    color: white;
  }
`;

export const TextInput = styled.textarea`
  border-radius: 6px;
  border: 1px solid purple;
  // width: 70%;
  outline: none;
  padding: 7px;
  min-height: 240px;
  // padding: 5px;
  // margin: 9px;
`;
