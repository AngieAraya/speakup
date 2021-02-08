import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export  function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
    // console.log('response', response);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout(){
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
    
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)

  }

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(user => {
  //     if (user) {
  //       setCurrentUser(user);
        
  //       // setState({
  //         //   currentUser: user,
  //         //   isLoggedIn: true
  //         // });
  //       } else {
  //       setCurrentUser(null);
  //       // setState({
  //       //   currentUser: null,
  //       //   isLoggedIn: false
  //       // });
  //     }
  //     setLoading(false);
  //   });

  //   // Cleanup subscription on unmount
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        console.log('hej');
        setCurrentUser(user);
        setLoading(false);
      })
      return unsubscribe;
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
