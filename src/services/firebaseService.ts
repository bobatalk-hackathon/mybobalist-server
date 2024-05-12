import { auth, db } from "../config/firebaseAdmin";

export const createUser = async (email: string, password: string) => {
  const userRecord = await auth.createUser({ email, password });
  return userRecord;
};

export const getUser = async (uid: string) => {
  const userRecord = await auth.getUser(uid);
  return userRecord;
};

export const updateUserProfile = async (uid: string, profileData: any) => {
  await db.collection("profiles").doc(uid).set(profileData, { merge: true });
  return profileData;
};
