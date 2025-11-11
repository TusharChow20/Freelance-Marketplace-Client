import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import Lottie from "lottie-react";
const googleProvider = new GoogleAuthProvider();

const AuthLoading = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/public/Sandy Loading.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
    // .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-64 h-64">
        {animationData && <Lottie animationData={animationData} loop={true} />}
      </div>
    </div>
  );
};
const AuthProvider = ({ children }) => {
  ////------states------------
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //   console.log(user);

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  const authInfo = {
    googleLogin,
    user,
    logOut,
    createUser,
    logIn,
    loading,
    setLoading,
    setUser,
  };
  if (loading) {
    return <AuthLoading />;
  }

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
