import React, { useContext, useState, useEffect } from 'react'
import { auth } from "../firebase"


const AuthContext = React.createContext()

//we have acces to our AuthContext thru  useAuth hook now
export function useAuth() {
  return useContext(AuthContext)
}

export  function AuthProvider({ children }) {
  //19:00
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
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
  
  useEffect(() => {
    //20:04
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
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
