import { auth, refs } from "./config";
import { asyncErrorHandler } from "../../utils/errorHandlers";

export const signIn = ({ email, password }) =>
  auth()
    .signInWithEmailAndPassword(email, password)
    .catch((error) => {
      asyncErrorHandler(error);
      throw error;
    });

export const getUserDetails = ({ id, setFirestore, resetState }) => {
  return refs.users.doc(id).onSnapshot((doc) => {
    if (doc.exists) {
      setFirestore({ ...doc.data(), ref: doc.ref });
    } else {
      resetState();
    }
  });
};

export const signOut = () => {
  return auth().signOut();
};
