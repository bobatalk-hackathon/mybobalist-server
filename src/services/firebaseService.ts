import { auth, db } from "../config/firebaseAdmin";

export const createUser = async (email: string, password: string) => {
  const userRecord = await auth.createUser({ email, password });
  return userRecord;
};

export const getUser = async (uid: string) => {
  const userRecord = await auth.getUser(uid);
  return userRecord;
};

export const getUserByEmail = async (email: string) => {
  const userRecord = await auth.getUserByEmail(email);
  return userRecord;
};

export const createUserProfile = async (
  uid: string,
  email: string,
  firstName: string,
  lastName: string,
  location: string,
  favoriteBoba?: string
) => {
  const userRef = db.collection("userprofile").doc(uid);
  await userRef.set({
    uid,
    email,
    firstName,
    lastName,
    location,
    favoriteBoba,
  });
  return { uid, email, firstName, lastName, location, favoriteBoba };
};

export const getUserProfileById = async (uid: string) => {
  const userRef = db.collection("userprofile").doc(uid);
  const userProfile = await userRef.get();
  return userProfile.data();
};
