import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import resetImg from "../../img/forgot_password.png";
import styled from "styled-components";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Kontrollera din inkorg för ytterligare instruktioner");
    } catch {
      setMessage("Det gick inte att återställa lösenordet");
    }

    setLoading(false);
  }

  return (
    <Container>
      <h2 className="text-center mb-4">Glömt lösenord?</h2>
      <Image src={resetImg} alt="resetimg Image" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          ref={emailRef}
          placeholder="E-postadress"
          required
        />
        <button disabled={loading} type="submit">
          Återställ lösenord
        </button>
      </form>
      {message && <Alert>{message}</Alert>}
    </Container>
  );
}

const Alert = styled.div`
  text-align: center;
  color: #e40a0a;
`;

export const Container = styled.div`
  border: 2px solid #f7f7f7;
  max-width: 60%;
  display: flex;
  flex-direction: column;
  margin: 5rem auto;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 8px 10px 15px -3px rgb(0 0 0 / 38%);
`;

export const Image = styled.img`
  max-width: 150px;
  border-radius: 50%;
`;
