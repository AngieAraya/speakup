import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import * as S from "../styles/FormStyle";
import { SocialBtnContainer } from "../styles/GeneralStyle";
import LoginFacebook from "./LoginFacebook";
import LoginGoogle from "./LoginGoogle";

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
      <S.Container>
        <S.Header>Logga in</S.Header>
        {error && <S.Alert variant="danger">{error}</S.Alert>}
        <S.Form onSubmit={handleSubmit}>
          <S.Input type="email" ref={emailRef} required placeholder="Email" />
          <S.Input
            type="password"
            ref={passwordRef}
            required
            placeholder="Lösenord"
          />
          <S.Button disabled={loading} type="submit">
            Logga in
          </S.Button>
        </S.Form>
        <S.TextCenter>
          <Link to="/forgot-password">Glömt Lösenord?</Link>
        </S.TextCenter>
        <SocialBtnContainer>
          <LoginGoogle />
          <LoginFacebook />
        </SocialBtnContainer>
        <S.TextCenter>
          Har du inget konto? <Link to="/signup">Skapa konto</Link>
        </S.TextCenter>
      </S.Container>
    </>
  );
}
