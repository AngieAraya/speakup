import React, { useRef, useState } from "react";
import * as S from "../styles/forms/CreatePostForm";
import { LinkDiv, CancelBtnLink } from "../styles/ProfilePageStyle";
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
      <S.Form onSubmit={handleSubmit}>
        <S.Header>Skapa inlägg</S.Header>
        <S.TextWrapper>
          <S.Wrapper>
            <S.TitleWrapper>
              <label>Title</label>
              <br />
              <S.Input type="text" ref={titleRef} required />
            </S.TitleWrapper>
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
          </S.Wrapper>
          <label>Text</label>
          <S.TextInput type="text" ref={textRef} required></S.TextInput>
        </S.TextWrapper>
        <S.BtnAndInputWrapper>
          <S.AnonymousCheck>
            <S.AnonymousLabel>Jag vill vara Anonym</S.AnonymousLabel>
            <input type="checkbox" onClick={toggleCheckbox} />
          </S.AnonymousCheck>
          <S.ButtonWrapper>
            <S.Button type="submit">Publicera</S.Button>
            <LinkDiv>
              <CancelBtnLink to="/profile">Avbryt</CancelBtnLink>
            </LinkDiv>
          </S.ButtonWrapper>
        </S.BtnAndInputWrapper>
      </S.Form>
    </div>
  );
}
