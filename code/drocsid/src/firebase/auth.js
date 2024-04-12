import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = async () => {
  return auth.signOut();
};

export const doPasswordReset = async (email) => {
  return sendPasswordResetEmail(auth, email);
};

/*
export const changeEmail = async (email) => {
  return auth.updateEmail(email);
}

export const changeUsername = async (username) => {
  return auth.currentUser.updateProfile({
    username: username
    });
}
*/

// export const doPasswordUpdate = async (password) => {
//   return updatePassword(auth.currentUser, password);
// };

// export const doDeleteUser = async () => {
//   return currentUser.delete();
// };

