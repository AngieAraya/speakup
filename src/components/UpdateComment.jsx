import React, { useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  Header,
  Modal,
  ModalContainer,
} from "./styles/FormStyle";
import { LinkDiv } from "../components/styles/ProfilePageStyle";
import { firestore } from "../firebase";

export default function UpdateComment({ postId, comment, setShowModal }) {
  const textRef = useRef();
  const [checkbox, setCheckBox] = useState(false);

  const updateComment = (e) => {
    setShowModal(false)
    e.preventDefault();
    // console.log("text ref", textRef.current.value);
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
    setCheckBox(prev => !prev);
  };

  return (
    <Modal>
      <ModalContainer>
        <Header>{comment && comment.text}</Header>
        {comment && (
          <Form onSubmit={updateComment}>
            <label>text</label>
            <Input
              type="text"
              ref={textRef}
              required
              defaultValue={comment.text}
            />
            <label>Jag vill vara Anonym</label>
          <input type="checkbox" onClick={toggleCheckbox}/>
            <Button type="submit">Update</Button>
          </Form>
        )}
        <LinkDiv>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </LinkDiv>
      </ModalContainer>
    </Modal>
  );
}
