import React, { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Form, Container, Input, Button, Header, TextCenter } from "../styles/SignupFormStyle";
// import LoginFacebook from './LoginFacebook'
// import firebase from "firebase"
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
// import LoginGoogle from './LoginGoogle'

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
        <Header className="text-center mb-4">Log in</Header>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Input type="email" ref={emailRef} required placeholder="Email" />
          <Input
            type="password"
            ref={passwordRef}
            required
            placeholder="Password"
          />
          <Button disabled={loading} className="w-100" type="submit">
            Log in
          </Button>
        </Form>
        {/* <LoginGoogle/> */}
        {/* <LoginFacebook/> */}
        {/* {isSignedIn ? (
          // <span>
          //   <div>Signed In!</div>
          //   <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          //   <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          //   <img
          //     alt="profile picture"
          //     src={firebase.auth().currentUser.photoURL}
          //   />
          // </span>
          <h1>hej</h1>
        ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )} */}
      <TextCenter>
        <Link to="/forgot-password">Forgot Password</Link>
      </TextCenter>
      <TextCenter>
        Need an account? <Link to="/signup">Sign up</Link>
      </TextCenter>
      </Container>
    </>
  );
}
