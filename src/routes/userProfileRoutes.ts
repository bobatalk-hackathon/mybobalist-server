import express from "express";

import { requireAuth } from "../middleware/requireAuth";
import {
  createUserProfile,
  getUserProfileById,
} from "../services/firebaseService";
import { UserProfile } from "../types";

const router = express.Router();

// create user profile endpoint
router.post("/create", requireAuth, async (req, res) => {
  // Extract user data from the request object
  const { email, uid } = (req as any).user as { email: string; uid: string };

  const { firstName, lastName, location, favoriteBoba } =
    req.body as UserProfile;

  const userProfileRecord = await createUserProfile(
    uid,
    email,
    firstName,
    lastName,
    location,
    favoriteBoba
  );

  return res.status(201).send(userProfileRecord);
});

// get current user profile endpoint
router.get("/current", requireAuth, async (req, res) => {
  const { uid } = (req as any).user as { email: string; uid: string };

  const userProfileRecord = await getUserProfileById(uid);

  return res.status(200).send(userProfileRecord);
});

export default router;
