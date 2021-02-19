import React, { useContext, useState, useEffect } from "react";
import { auth, firestore } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userDetail, setUserDetail] = useState({});
  const [loading, setLoading] = useState(true);

  const saveUserToDB = async (user, name) => {
    const db = await firestore;
    return db
      .collection("users")
      .doc(user.uid.toString())
      .set({
        id: user.uid.toString(),
        name,
        email: user.email,
      })
      .then(() => {
        // console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  function signup(email, password, userName) {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      saveUserToDB(res.user, userName);
      return res.user;
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  // const updateUserEmailToDB = async (email) => {
  //   console.log("em", email);
  //   const db = await firestore;
  //   return db
  //     .collection("users")
  //     .doc(currentUser.uid.toString())
  //     .update({
  //       email
  //     })
  //     .then(() => {
  //       console.log("Document successfully written!");
  //     })
  //     .catch((error) => {
  //       console.error("Error writing document: ", error);
  //     });
  // };

  function updateEmail(email) {
    return currentUser.updateEmail(email);
    // updateUserEmailToDB(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function deleteUser() {
    return currentUser.delete();
    //   return firestore.collection("users").doc().delete().then(() => {
    //     console.log("Document successfully deleted!");
    // }).catch((error) => {
    //     console.error("Error removing document: ", error);
    // });
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
              uid: user.uid,
            };
            setUserDetail(userData);
          } else {
            console.log("No such docummment!");
          }
        });
    } else {
      setCurrentUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("user", user);
      setCurrentUser(user);
      setLoading(false);
      getUserData(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userDetail,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
