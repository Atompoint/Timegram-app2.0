import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth as fbAuth } from "api/firebase/config";
import {
  setUserAuth,
  setUserFirestore,
  stopUserLoading,
  clearUser,
  startUploading,
} from "redux/userSlice";
import { getUserDetails } from "api/firebase/user";

export default function FirebaseProvider({ children }) {
  const { auth, firestore } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const resetState = () => {
    dispatch(clearUser());
  };

  // ******************** authentication listener ********************
  useEffect(() => {
    const unsubscribe = fbAuth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUserAuth(user));
      } else {
        resetState();
      }
    });
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  // *****************************************************************

  // ******************** user data listener ********************
  useEffect(() => {
    let unsubscribe;
    const setFirestore = (data) => {
      dispatch(setUserFirestore(data));
      dispatch(startUploading());
      dispatch(stopUserLoading());

      if (location.pathname === "/") {
        navigate("/home");
      }
    };

    if (auth && !firestore) {
      unsubscribe = getUserDetails({ id: auth.uid, setFirestore, resetState });
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [auth]);
  // ************************************************************

  return children;
}
