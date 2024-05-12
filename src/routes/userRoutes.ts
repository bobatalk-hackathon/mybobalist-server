import express from "express";
import {
  createUser,
  getUser,
  updateUserProfile,
} from "../services/firebaseService";

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const userRecord = await createUser(req.body.email, req.body.password);
    res.status(201).send(userRecord);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

router.get("/users/:uid", async (req, res) => {
  try {
    const userRecord = await getUser(req.params.uid);
    res.status(200).send(userRecord);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

router.patch("/users/:uid/profile", async (req, res) => {
  try {
    const updatedProfile = await updateUserProfile(req.params.uid, req.body);
    res.status(200).send(updatedProfile);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

export default router;
