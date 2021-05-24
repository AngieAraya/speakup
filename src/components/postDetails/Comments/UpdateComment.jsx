import React, { useRef, useState } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Header,
//   Modal,
//   ModalContainer,
// } from "../../styles/FormStyle";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

import { LinkDiv } from "../../styles/ProfilePageStyle";
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
        console.log("COMMENT Updated");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const toggleCheckbox = () => {
    setCheckBox((prev) => !prev);
  };

  return (
    <Modal>
      <ModalContainer>
        <ModalCloseBtn>
          <AiOutlineClose onClick={() => setShowModal(false)} />
        </ModalCloseBtn>
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
              <Button type="submit">Uppdatera</Button>
              <Button onClick={() => setShowModal(false)}>Avbryt</Button>
            </div>
          </Form>
        )}
        {/* <LinkDiv>
        </LinkDiv> */}
      </ModalContainer>
    </Modal>
  );
}

export const ModalCloseBtn = styled.div`
  text-align: right;
  cursor: pointer;
  &:hover {
    color: #4e746a;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
  min-width: 90%;
  // align-items: center;
  // align-items: flex-start;
  align-items: center;
`;

export const TextareaWrapper = styled.div`
  width: 100%;
  text-align:left;
`;
export const TextareaLabel = styled.label`
  align-self: self-end;
  margin-left: 10px;
`;
export const StyledTextarea = styled.textarea`
  border-radius: 6px;
  // background: yellow;
  margin: 0.3rem;
  border: 1px solid purple;
  // width: 70%;
  width: 91%;
  min-height: 80px;
  padding: 5px;
  margin: 9px;
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
  width: 97%;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(141 75 206);
    color: white;
  }
`;

export const Header = styled.h1`
  text-align: center;
`;

export const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

export const ModalContainer = styled.div`
  background: #eeeeee;
  // width: 50%;
  max-width: 365px;
  // padding: 40px 20px;
  padding: 0 27px 17px;
  margin: auto;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // height: 80vh;
  height: 400px;
`;
