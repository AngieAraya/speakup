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
  // const [text, setText] = useState("");
  console.log("comment i upd file", comment.docId);
  
  const updateComment = (e) => {
    e.preventDefault();
    console.log("text ref", textRef.current.value);
    firestore
      .collection("posts")
      .doc(postId)
      .collection("comment")
      .doc(comment.docId)
      .update({
        text: textRef.current.value,
      })
      .then(() => {
        console.log("COMMENT Updated");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
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
