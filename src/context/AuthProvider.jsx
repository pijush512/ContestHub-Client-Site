import React from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase/firebase.init'

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const logInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider)
  }

  const authInfo = {
    registerUser,
    logInUser,
    googleSignIn,
  }

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider
