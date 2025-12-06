import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase.init'

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  };

  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
  }

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile)
  }



  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    })
    return () => {
      unSubscribe();
    }
  }, []);

  useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      await currentUser.reload(); // এটা দিলেই photoURL আপডেট হবে
      setUser(currentUser);
    } else {
      setUser(null);
    }
    setLoading(false);
  });

  return () => unSubscribe();
}, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    logInUser,
    googleSignIn,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  )
}

export default AuthProvider
