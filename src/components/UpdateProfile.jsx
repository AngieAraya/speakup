import React, { useRef, useState } from "react";
import { Container, Form, Input, Button, Header, Modal, ModalContainer } from "./styles/FormStyle";
import { LinkDiv } from "../components/styles/ProfilePageStyle";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { firestore } from "../firebase";


export default function UpdateProfile({setShowModal}) {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, userDetail, updatePassword, updateEmail, setUserDetail} = useAuth();
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
    // setUserDetail({...userDetail, email:emailRef.current.value})
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  }

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
        UpdateUserToDB()
      })
      .then(() => {
        setLoading(false);
        setShowModal(false)
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
        <Header>Update Profile</Header>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <label>name</label>
          <Input
            type="name"
            ref={nameRef}
            required
            defaultValue={userDetail.name}
          />
          <label>Email</label>
          <Input
            type="email"
            ref={emailRef}
            required
            defaultValue={currentUser.email}
          />
          <label>Password</label>
          <Input
            type="password"
            ref={passwordRef}
            placeholder="Leave blank to keep the same"
          />
          <label>Password Confirmation</label>
          <Input
            type="password"
            ref={passwordConfirmRef}
            placeholder="Leave blank to keep the same"
          />
          <Button disabled={loading} type="submit">
            Update
          </Button>
        </Form>
        <LinkDiv>
        <Button onClick={()=> setShowModal(false)}>Cancel</Button>
          {/* <CancelLink to="/profile">Cancel</CancelLink> */}
        </LinkDiv>
      </ModalContainer>
    </Modal>
  );
}
