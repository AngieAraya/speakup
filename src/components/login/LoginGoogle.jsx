import React, { useState } from "react";
// import GoogleLogin from 'react-google-login';
// import firebase from "../firebase";
import {
  GoogleBtn, SocialGoogleText
 } from "../styles/GeneralStyle";
import { FcGoogle } from 'react-icons/fc';
import firebase from "firebase/app"
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginGoogle() {
const { saveUserToDB, loginWithGmail } = useAuth();
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [name, setName] = useState("")
const [photo, setPhoto] = useState("")
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const history = useHistory()

 async function handleClick(){
   let provider = new firebase.auth.GoogleAuthProvider();
 const updProfileOpt = false

  try {
    setError("");
    setLoading(true);
    await loginWithGmail(provider, updProfileOpt)
    setLoading(false);
    history.push("/profile");
  } catch {
    setError("Failed to sig in");
    setLoading(false);
  }
  // let provider = new firebase.auth.GoogleAuthProvider();
  // // console.log(provider);
  //   firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then((result) => {
  //       // /** @type {firebase.auth.OAuthCredential} */
  //       history.push("/profile")
  //       const updProfileOpt = false
  //       saveUserToDB(result.user, result.user.displayName, updProfileOpt)
  //       var credential = result.credential;

  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       var token = credential.accessToken;
  //       // The signed-in user info.
  //       var user = result.user;
  //       // ...
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  };

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     console.log("user i loginGOOGl", user);
  //     if (user) {
  //       // console.log("User Signed in");
  //       // console.log(user.displayName + '\n' + user.email);
  //       setCurrentUser(user);
  //       const userData = {
  //         email: user.email,
  //         name: user.displayName,
  //         id: user.uid,
  //         admin: false,
  //       };
  //       setUserDetail(userData);
  //       // history.push("/profile")
  //       // setIsLoggedIn(true)
  //       // setName(user.displayName)
  //       // setPhoto(user.photoURL)
  //     } else {
  //       console.log("No User is signed in");
  //     }
  //   });
  // }, []);

  // const handleSignOut = () => {
  //   firebase.auth().signOut().then(() => {
  //     // Sign-out successful.
  //   }).catch((error) => {
  //     // An error happened.
  //   });

  //   setIsLoggedIn(false)

  // }

  return (
    <div>
      {/* användes utan history push. Här kommer en logga ut knapp när man är inloggad om inte så en logga in knapp. fixa detta så det matchar med att logga in och spar bild och namn osv till dashboard */}
      {<GoogleBtn onClick={handleClick}><FcGoogle/><SocialGoogleText>Logga in med Google</SocialGoogleText></GoogleBtn>}
      {/* <button onClick={handleSignOut}>sign out</button> */}

      {/* <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  /> */}
    </div>
  );
}
