import React , { useEffect, useRef, useState }  from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import LoginFacebook from './LoginFacebook'
// import firebase from "firebase"
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import LoginGoogle from './LoginGoogle'


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  // const [isSignedIn, setIsSignedIn] = useState(false);

  // const uiConfig = {
  //   signInFlow: "popup",
  //   signInOptions: [
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,

  //   ],
  //   callbacks: {
  //     signInSuccess: () => false
  //   }
  // }

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     setIsSignedIn(!!user)
  //     console.log("user", user)
  //   })
  // }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
     history.push("/")
    } catch {
      setError("Failed to sig in")
    }

    setLoading(false)
  }

  return (
    <>
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Log in</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log in
            </Button>
        </Form>
        <LoginGoogle/>
        <LoginFacebook/>
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
          <h1>jesper</h1>
        ) : (
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )} */}

    <div className="w-100 text-center mt-3">
       <Link to ="/forgot-password">Forgot Password</Link>
    </div>
      </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
      Need an account? <Link to ="/signup">Sign up</Link>
    </div>
      
    </>
  )
}
