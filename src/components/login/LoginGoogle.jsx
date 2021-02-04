// import React, { useEffect, useState } from "react";
// // import GoogleLogin from 'react-google-login';
// // import firebase from "../firebase";
// import firebase from "firebase/app"
// import { useHistory } from "react-router-dom";

// // import "firebase/auth"


// // const responseGoogle = (response) => {
// //   console.log(response);
// //   console.log(response.profileObj);
// // }

// export default function LoginGoogle() {
// const [isLoggedIn, setIsLoggedIn] = useState(false)
// const [name, setName] = useState("")
// const [photo, setPhoto] = useState("")
// const history = useHistory()


// const handleClick = () => {
//   let provider = new firebase.auth.GoogleAuthProvider();
//   // console.log(provider);
//     firebase
//       .auth()
//       .signInWithPopup(provider)
//       .then((result) => {
//         // /** @type {firebase.auth.OAuthCredential} */
//         // console.log(result);
//         var credential = result.credential;

//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         // ...
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   useEffect(() => {
//     firebase.auth().onAuthStateChanged(function (user) {
//       // console.log(user);
//       if (user) {
//         // console.log("User Signed in");
//         // console.log(user.displayName + '\n' + user.email);
//         history.push("/")
//         setIsLoggedIn(true)
//         setName(user.displayName)
//         setPhoto(user.photoURL)
//       } else {
//         console.log("No User is signed in");
//       }
//     });
//   }, []);

//   // const handleSignOut = () => {
//   //   firebase.auth().signOut().then(() => {
//   //     // Sign-out successful.
//   //   }).catch((error) => {
//   //     // An error happened.
//   //   });

//   //   setIsLoggedIn(false)

//   // }

//   return (
//     <div>
//       {/* användes utan history push. Här kommer en logga ut knapp när man är inloggad om inte så en logga in knapp. fixa detta så det matchar med att logga in och spar bild och namn osv till dashboard */}
//       {isLoggedIn === false ? <button onClick={handleClick}>Login with Google</button> :<div> <h5>{name}</h5> <img src={photo} alt=""/></div>}
//       {/* <button onClick={handleSignOut}>sign out</button> */}

//       {/* <GoogleLogin
//     clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
//     buttonText="Login"
//     onSuccess={responseGoogle}
//     onFailure={responseGoogle}
//     cookiePolicy={'single_host_origin'}
//   /> */}
//     </div>
//   );
// }
