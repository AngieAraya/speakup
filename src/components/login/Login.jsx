import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Form, Container, Input, Button, Header, TextCenter } from "../styles/FormStyle";
import {
  SocialBtnContainer
 } from "../styles/GeneralStyle";
import LoginFacebook from './LoginFacebook'
import LoginGoogle from './LoginGoogle'

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      history.push("/profile");
    } catch {
      setError("Failed to sig in");
      setLoading(false);
    }
  }

  return (
    <>
      <Container>
        <Header >Logga in</Header>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Input type="email" ref={emailRef} required placeholder="Email" />
          <Input
            type="password"
            ref={passwordRef}
            required
            placeholder="Lösenord"
          />
          <Button disabled={loading} type="submit">
            Logga in
          </Button>
        </Form>
        <TextCenter>
        <Link to="/forgot-password">Glömt Lösenord?</Link>
      </TextCenter>
        <SocialBtnContainer>
        <LoginGoogle/>
        <LoginFacebook/>
        </SocialBtnContainer>
      <TextCenter>
        Har du inget konto? <Link to="/signup">Skapa konto</Link>
      </TextCenter>
      </Container>
    </>
  );
}
