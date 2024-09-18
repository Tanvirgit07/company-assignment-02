import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.init";
import PropTypes from "prop-types";



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false); 
  const [loading, setLoading] = useState(true); 

  // Function to create a new user
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to update the user's profile
  const updateUserProfile = async (name, photo) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  // Function to log in an existing user
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to log in with Google
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error("Error logging in with Google:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Function to log out the user
  const userLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Monitor the user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe(); // Cleanup subscription
    };
  }, [reload]); // Reload can be triggered manually if needed

  // Context value containing all auth-related functions and states
  const authInfo = {
    createUser,
    user,
    setUser,
    loading,
    updateUserProfile,
    setReload, // Optionally trigger reloads
    loginUser,
    googleLogin,
    userLogout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children} {/* Render children only when loading is complete */}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
