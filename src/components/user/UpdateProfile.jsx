import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
// import { Form, Input, Button, Header, Modal, ModalContainer } from "../styles/FormStyle";
import { LinkDiv } from "../styles/ProfilePageStyle";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firestore } from "../../firebase";

export default function UpdateProfile({ setShowModal }) {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {
    currentUser,
    userDetail,
    updatePassword,
    updateEmail,
    setUserDetail,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const UpdateUserToDB = () => {
    firestore
      .collection("users")
      .doc(userDetail.id)
      .update({
        email: emailRef.current.value,
        name: nameRef.current.value,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }
    Promise.all(promises)
      .then(() => {
        UpdateUserToDB();
      })
      .then(() => {
        setLoading(false);
        setShowModal(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to update account");
      });
    // .finally(() => {
    // })
  }

  return (
    <Modal>
      <ModalContainer>
        <ModalCloseBtn>
          <AiOutlineClose onClick={() => setShowModal(false)} />
        </ModalCloseBtn>
        <Header>Uppdatera Profil</Header>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Label>Namn</Label>
          <Input
            type="name"
            ref={nameRef}
            required
            defaultValue={userDetail.name}
          />

          <Label>E-post</Label>
          <Input
            type="email"
            ref={emailRef}
            required
            defaultValue={currentUser.email}
          />

          <Label>Lösenord</Label>
          <Input
            type="password"
            ref={passwordRef}
            placeholder="Leave blank to keep the same"
          />

          <Label>Bekräfta lösenord</Label>
          <Input
            type="password"
            ref={passwordConfirmRef}
            placeholder="Leave blank to keep the same"
          />
          <div>
            <Button disabled={loading} type="submit">
              Uppdatera
            </Button>
            <Button onClick={() => setShowModal(false)}>Avbryt</Button>
          </div>
        </Form>
        <LinkDiv>{/* <CancelLink to="/profile">Cancel</CancelLink> */}</LinkDiv>
      </ModalContainer>
    </Modal>
  );
}

export const ModalCloseBtn = styled.div`
  text-align: right;
  cursor: pointer;
  margin-top: 8px;
  &:hover {
    color: #4e746a;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
`;

export const ModalContainer = styled(Container)`
  background: #eeeeee;
  max-width: 365px;
  height: 400px;
  margin: auto;
  border-radius: 10px;
  padding: 40px 20px;
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
  width: 97%;
  &:hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(141 75 206);
    color: white;
  }
`;

export const Input = styled.input`
  border-radius: 6px;
  margin: 0.3rem;
  border: 1px solid purple;
  padding: 5px;
`;

export const Label = styled.label`
  margin: 7px 0 0 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
  margin: 10px auto 32px;
`;
