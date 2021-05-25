import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import * as S from "../../styles/ModalStyle";
import { UpdBtn, CanselBtn } from "../../styles/Buttons";
import { firestore } from "../../../firebase";

export default function UpdateComment({ postId, comment, setShowModal }) {
  const textRef = useRef();
  const [checkbox, setCheckBox] = useState(false);

  const updateComment = (e) => {
    setShowModal(false);
    e.preventDefault();
    firestore
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .doc(comment.docId)
      .update({
        text: textRef.current.value,
        anonymousPost: checkbox,
      })
      .then(() => {
        console.log("Comment Updated");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const toggleCheckbox = () => {
    setCheckBox((prev) => !prev);
  };

  return (
    <S.Modal>
      <ModalContainer>
        <S.ModalCloseBtn>
          <AiOutlineClose onClick={() => setShowModal(false)} />
        </S.ModalCloseBtn>
        {/* <Header>{comment && comment.text}</Header> */}
        <Header>Uppdatera kommentar</Header>
        {comment && (
          <Form onSubmit={updateComment}>
            <TextareaWrapper>
              <TextareaLabel>Kommentar</TextareaLabel>
              <StyledTextarea
                type="text"
                ref={textRef}
                required
                defaultValue={comment.text}
              />
            </TextareaWrapper>
            <div>
              <label>Jag vill vara Anonym</label>
              <input type="checkbox" onClick={toggleCheckbox} />
            </div>
            <div>
              <UpdBtn type="submit">Uppdatera</UpdBtn>
              <CanselBtn onClick={() => setShowModal(false)}>Avbryt</CanselBtn>
            </div>
          </Form>
        )}
      </ModalContainer>
    </S.Modal>
  );
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
  min-width: 90%;
  align-items: center;
`;

export const TextareaWrapper = styled.div`
  width: 100%;
  text-align: left;
`;

export const TextareaLabel = styled.label`
  align-self: self-end;
  margin-left: 10px;
`;

export const StyledTextarea = styled.textarea`
  border-radius: 6px;
  margin: 0.3rem;
  border: 1px solid purple;
  width: 91%;
  min-height: 80px;
  padding: 5px;
  margin: 9px;
`;

export const Header = styled.h1`
  text-align: center;
`;

export const ModalContainer = styled.div`
  background: #eeeeee;
  max-width: 365px;
  padding: 0 27px 17px;
  margin: auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 400px;
`;
