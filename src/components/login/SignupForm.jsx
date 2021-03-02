import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import {
  Form, Container, Input, Button, Header, TextCenter
} from "../styles/FormStyle";

export default function SignupForm() {
  const [name, setName] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      const updProfileOpt = true
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value, name, updProfileOpt);
      setLoading(false);
      history.push("/profile");
    } catch {
      setError("Failed to create an account");
      setLoading(false);
    }
    // if(sucessLogin){
    //   console.log('currenttest');
    //   history.push("/");
    // }
  };

  return (
    <>
      <Container>
        <Header>Sign up</Header>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="User Name"
            />
            <Input type="email" ref={emailRef} required placeholder="E-postadress" />
            <Input type="password" ref={passwordRef} required placeholder="Lösenord" />
            <Input type="password" ref={passwordConfirmRef} required placeholder="Upprepa lösenord" />
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

{/* <InputContainer id="email">
<Input type="email" ref={emailRef} required placeholder="Email" />
</InputContainer>
<InputContainer id="password">
<Input type="password" ref={passwordRef} required placeholder="Password" />
</InputContainer>
<InputContainer id="password-confirm">
<Input type="password" ref={passwordConfirmRef} required placeholder="Password Confirmation" />
</InputContainer> */}