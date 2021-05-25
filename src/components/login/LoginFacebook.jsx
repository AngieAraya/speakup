import React, { useState } from "react";
import { FbBtn, SocialText } from "../styles/GeneralStyle";
import firebase from "firebase/app";
import { useAuth } from "../../contexts/AuthContext";
import { FaFacebook } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export default function LoginFacebook() {
  const { loginWithFacebook } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleClick = async () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    const updProfileOpt = false;

    try {
      setError("");
      setLoading(true);
      await loginWithFacebook(provider, updProfileOpt);
      setLoading(false);
      history.push("/profile");
    } catch {
      setError("Failed to sig in");
      setLoading(false);
    }
  };

  return (
    <>
      <FbBtn onClick={handleClick}>
        <FaFacebook />
        <SocialText>Logga in med Facebook</SocialText>
      </FbBtn>
    </>
  );
}
