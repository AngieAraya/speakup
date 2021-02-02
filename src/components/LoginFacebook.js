import React, { useEffect, useState } from 'react'
// import FacebookLogin from 'react-facebook-login'
import firebase from "firebase/app"

// import { useHistory } from 'react-router-dom'

export default function LoginFacebook() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const history = useHistory()
  // var provider = new firebase.auth.FacebookAuthProvider();
  // console.log(provider);


  // const responseFacebook = (response)  => {
  //   console.log(response)
  //   // console.log(response.accessToken)
  //   // console.log(response.name)
  //   // setIsLoggedIn(true)
  //   // history.push("/")
  // }

  const handleClick = () => {
    var provider = new firebase.auth.FacebookAuthProvider();    console.log(provider);
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          // /** @type {firebase.auth.OAuthCredential} */
          console.log(result);
          var credential = result.credential;
  
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
        })
        .catch((error) => {
          console.log(error);
        });
    };

    useEffect(() => {
      firebase.auth().onAuthStateChanged(function (user) {
        console.log(user);
        if (user) {
          console.log("User Signed in");
         // console.log(user.displayName + '\n' + user.email);
          // history.push("/")
          setIsLoggedIn(true)
 
        } else {
          console.log("No User is signed in");
        }
      });
    }, []);
  

  
  return (
    <div>
    {isLoggedIn === false ? <button onClick={handleClick}>Login with Facebook</button> :<div> <h5>hej</h5></div>}


    </div>
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
