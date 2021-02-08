import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
// import { firestore } from "../../firebase";

export default function SignupForm() {
  const [displayName, setDisplayName] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("tes0", currentUser);

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup( emailRef.current.value, passwordRef.current.value);
      console.log("tes1", currentUser);
      setLoading(false);
      history.push("/")
      
      // const user = await signup( emailRef.current.value, passwordRef.current.value);
      // generateUserDocument(user.user);
      
    } catch {
      console.log("tes2", currentUser);
      setError("Failed to create an account");
      setLoading(false);
    }
    console.log("tes3", currentUser);
    // if(sucessLogin){
    //   console.log('currenttest');
    //   history.push("/");
    // }

  };

  // const generateUserDocument = async (user) => {
  //   // console.log("user11", user);
  //   if (!user) return;
  //   const userRef = firestore.doc(`users/${user.uid}`);
  //   const snapshot = await userRef.get();
  //   if (!snapshot.exists) {
  //     const { email } = user;
  //     try {
  //       await userRef.set({
  //         displayName,
  //         email,
  //       });
  //     } catch (error) {
  //       console.error("Error creating user document", error);
  //     }
  //   }
  //   return getUserDocument(user.uid);
  // };
  // const getUserDocument = async (uid) => {
  //   // console.log(uid);
  //   if (!uid) return null;
  //   try {
  //     const userDocument = await firestore.doc(`users/${uid}`).get();
  //     console.log('doc', userDocument.data())
  //     return {
  //       uid,
  //       ...userDocument.data(),
  //     };
  //   } catch (error) {
  //     console.error("Error fetching user", error);
  //   }
  // };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="displayName">
              <Form.Label>userName</Form.Label>
              <Form.Control
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log in</Link>
      </div>
    </>
  );
}
