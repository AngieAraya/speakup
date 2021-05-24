import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import resetImg from "../../img/forgot_password.png";
import {
  Container,
  Image,
} from "../../components/styles/ResetPasswordPageStyle";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Kontrollera din inkorg för ytterligare instruktioner");
    } catch {
      setMessage("Det gick inte att återställa lösenordet");
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <Container>
      <h2 className="text-center mb-4">Glömt lösenord?</h2>
      {/* {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>} */}
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
      {message && <h3>{message}</h3>}
    </Container>
  );
}
