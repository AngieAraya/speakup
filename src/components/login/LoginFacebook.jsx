import React, { useEffect, useState } from 'react'
import {
 FbBtn, SocialText
} from "../styles/GeneralStyle";
// import FacebookLogin from 'react-facebook-login'
import firebase from "firebase/app"
import { useAuth } from '../../contexts/AuthContext';
import FacebookIcon from '@material-ui/icons/Facebook';
import { FaFacebook } from 'react-icons/fa';

import { useHistory } from 'react-router-dom'

export default function LoginFacebook() {
  const {  loginWithFacebook } = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()
  // var provider = new firebase.auth.FacebookAuthProvider();
  // console.log(provider);

  // const responseFacebook = (response)  => {
  //   console.log(response)
  //   // console.log(response.accessToken)
  //   // console.log(response.name)
  //   // setIsLoggedIn(true)
  //   // history.push("/")
  // }

  const handleClick =  async () => {
    var provider = new firebase.auth.FacebookAuthProvider(); 
    const updProfileOpt = false

    try {
      setError("");
      setLoading(true);
      await loginWithFacebook(provider, updProfileOpt)
      setLoading(false);
      history.push("/profile");
    } catch {
      setError("Failed to sig in");
      setLoading(false);
    }

    // console.log(provider);
    //   firebase
    //     .auth()
    //     .signInWithPopup(provider)
    //     .then((result) => {
    //       // /** @type {firebase.auth.OAuthCredential} */
    //       // console.log(result);
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
    //     // console.log(user);
    //     if (user) {
    //       // console.log("User Signed in");
    //      // console.log(user.displayName + '\n' + user.email);
    //       // history.push("/")
    //       setIsLoggedIn(true)
 
    //     } else {
    //       // console.log("No User is signed in");
    //     }
    //   });
    // }, []);
  

  
  return (
    <>
    <FbBtn onClick={handleClick}><FaFacebook/><SocialText>Login with Facebook</SocialText></FbBtn>
    </>
    // <div>
    //   <FacebookLogin
    // appId="685561548827536"
    // autoLoad={true}
    // fields="name,email,picture"
    // // onClick={componentClicked}
    // callback={responseFacebook} />,  
    // </div>
  )
}
