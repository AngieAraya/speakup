import React, { useState } from "react";
// import GoogleLogin from 'react-google-login';
// import firebase from "../firebase";
import { GoogleBtn, SocialGoogleText } from "../styles/GeneralStyle";
import { FcGoogle } from "react-icons/fc";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginGoogle() {
  const { loginWithGmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleClick() {
    let provider = new firebase.auth.GoogleAuthProvider();
    const updProfileOpt = false;

    try {
      setError("");
      setLoading(true);
      await loginWithGmail(provider, updProfileOpt);
      setLoading(false);
      history.push("/profile");
    } catch {
      setError("Failed to sig in");
      setLoading(false);
    }
  }

  return (
    <div>
      {
        <GoogleBtn onClick={handleClick}>
          <FcGoogle />
          <SocialGoogleText>Logga in med Google</SocialGoogleText>
        </GoogleBtn>
      }
    </div>
  );
}
