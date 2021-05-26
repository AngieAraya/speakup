import React, { useEffect, useRef, useState } from "react";
import * as S from "../styles/forms/CreatePostForm";
import { LinkDiv, CancelBtnLink } from "../styles/ProfilePageStyle";
import { usePost } from "../../contexts/PostContext";
import { useCategory } from "../../contexts/CategoryContext";

export default function UpdatePost({ id }) {
  const { getPostDetailFromDb, postDetail, UpdatePost } = usePost();
  const { categories } = useCategory();
  const [category, setCategory] = useState("familj");
  const [checkbox, setCheckBox] = useState(false);
  const titleRef = useRef();
  const textRef = useRef();

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
    <div>
      {postDetail && (
        <S.Form onSubmit={handlePostUpdate}>
          <S.Header>Uppdatera inlägg</S.Header>
          <S.TextWrapper>
            <S.Wrapper>
              <S.TitleWrapper>
                <label>Title</label>
                <br />
                <S.Input
                  type="text"
                  ref={titleRef}
                  defaultValue={postDetail.title}
                  required
                />
              </S.TitleWrapper>
              <div>
                <label>Välj kategori:</label>
                <br />
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
                </select>
              </div>
            </S.Wrapper>
            <label>Text</label>
            <S.TextInput
              type="text"
              ref={textRef}
              defaultValue={postDetail.text}
            />
          </S.TextWrapper>
          <S.BtnAndInputWrapper>
            <S.AnonymousCheck>
              <S.AnonymousLabel>Jag vill vara Anonym</S.AnonymousLabel>
              <input type="checkbox" onClick={toggleCheckbox} />
            </S.AnonymousCheck>
            <S.ButtonWrapper>
              <S.Button required type="submit">
                Uppdatera
              </S.Button>
              <LinkDiv>
                <CancelBtnLink to="/profile">Avbryt</CancelBtnLink>
              </LinkDiv>
            </S.ButtonWrapper>
          </S.BtnAndInputWrapper>
        </S.Form>
      )}
    </div>
  );
}
