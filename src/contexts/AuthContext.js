import React, { useContext, useState, useEffect } from "react";
import app, { auth, firestore } from "../firebase";
import { useHistory } from "react-router-dom";


const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  auth.languageCode = 'sv';

  // console.log("Current User context", currentUser );
  // console.log(" User Detail context", userDetail );

  const saveUserToDB = async (user, name, updProfileOpt ) => {
    const db = await firestore;
    return db
      .collection("users")
      .doc(user.uid)
      .set({
        id: user.uid,
        name,
        email: user.email,
        admin: false,
        updateprofile: updProfileOpt,
      })
      .then(() => {
        // console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  function signup(email, password, userName, updProfileOpt) {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      saveUserToDB(res.user, userName , updProfileOpt);
      return res.user;
    });
  }

  function loginWithGmail(provider, updProfileOpt) {
    return auth.signInWithPopup(provider).then((res) => {
      saveUserToDB(res.user, res.user.displayName, updProfileOpt);
      return res.user;
    });
  }

  function loginWithFacebook(provider, updProfileOpt) {
    return auth.signInWithPopup(provider).then((res) => {
      saveUserToDB(res.user, res.user.displayName, updProfileOpt);
      return res.user;
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut().then(setUserDetail({}))
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
    // updateUserEmailToDB(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function deleteUser() {
    return currentUser.delete()
  }

  const getUserData = async (user) => {
    //Här är endast för att displaya info om min user som är inloggad
    if (user) {
      setLoading(false);
      await firestore
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = {
              email: doc.data().email,
              name: doc.data().name,
              id: user.uid,
              admin: doc.data().admin,
              updateprofile: doc.data().updateprofile,
            };
            setUserDetail(userData);
          } else {
            console.log("No such docummment!");
          }
        });
    } else {
      setUserDetail({})
      setCurrentUser();
      setLoading(false);
    }
  };

  const deleteUserFromDB = async () => {
    const db = await firestore;
    return db
      .collection("users")
      .doc(userDetail.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted from cloud firestorer!");
        history.push("/start");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };


  useEffect(() => {
    console.log("useffect context");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      getUserData(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    saveUserToDB,
    userDetail,
    setUserDetail,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    deleteUser,
    loginWithGmail,
    loginWithFacebook,
    deleteUserFromDB,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
