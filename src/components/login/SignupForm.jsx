import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Container,
  Input,
  Button,
  Header,
  TextCenter,
} from "../styles/FormStyle";
import styled from "styled-components";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let name = `${firstName} ${lastName}`;

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Lösenorden matchar inte");
    }

    try {
      const updProfileOpt = true;
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        name,
        updProfileOpt
      );
      setLoading(false);
      history.push("/profile");
    } catch {
      setError("Failed to create an account");
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Header>Skapa konto</Header>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Förnamn"
          />
          <Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Efternamn"
          />
          <Input
            type="email"
            ref={emailRef}
            required
            placeholder="E-postadress"
          />
          <Input
            type="password"
            ref={passwordRef}
            required
            placeholder="Lösenord"
          />
          <Input
            type="password"
            ref={passwordConfirmRef}
            required
            placeholder="Upprepa lösenord"
          />
          <Button disabled={loading} type="submit">
            Skapa ett konto
          </Button>
        </Form>
        <TextCenter>
          Har du redan ett konto? <Link to="/login">Logga in</Link>
        </TextCenter>
      </Container>
    </>
  );
}

const Alert = styled.div`
  text-align: center;
  color: #e40a0a;
`;
