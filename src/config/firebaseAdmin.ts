import * as admin from "firebase-admin";
import serviceAccount from "../../mybobalist-firebase-adminsdk-z7x21-1fe95c7b00.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();

export default admin;
