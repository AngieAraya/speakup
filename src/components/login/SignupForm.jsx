import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import * as S from "../styles/FormStyle";

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
      setError("E-posten används redan");
      setLoading(false);
    }
  };

  return (
    <>
      <S.Container>
        <S.Header>Skapa konto</S.Header>
        {error && <S.Alert variant="danger">{error}</S.Alert>}
        <S.Form onSubmit={handleSubmit}>
          <S.Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Förnamn"
          />
          <S.Input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Efternamn"
          />
          <S.Input
            type="email"
            ref={emailRef}
            required
            placeholder="E-postadress"
          />
          <S.Input
            type="password"
            ref={passwordRef}
            required
            placeholder="Lösenord"
          />
          <S.Input
            type="password"
            ref={passwordConfirmRef}
            required
            placeholder="Upprepa lösenord"
          />
          <S.Button disabled={loading} type="submit">
            Skapa ett konto
          </S.Button>
        </S.Form>
        <S.TextCenter>
          Har du redan ett konto? <Link to="/login">Logga in</Link>
        </S.TextCenter>
      </S.Container>
    </>
  );
}
