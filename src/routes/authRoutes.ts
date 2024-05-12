import express from "express";
import { createUser, getUserByEmail } from "../services/firebaseService";
import jwt from "jsonwebtoken";

require("dotenv").config();
const router = express.Router();

require("dotenv").config();
// User register endpoint
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await createUser(email, password);
    return res.status(201).send({
      uid: userRecord.uid,
      email: userRecord.email,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await getUserByEmail(email);
    // Here, the password should be verified with what's stored in Firebase
    // Assuming password verification has passed and custom token is generated
    const token = jwt.sign(
      { uid: userRecord.uid, email: userRecord.email },
      process.env.JWT_SECRET as string,
      {
        // Expires in 3 day
        expiresIn: "3d",
      }
    );

    // Set token in an HttpOnly cookie
    res.cookie("AuthToken", token, {
      httpOnly: true, // The cookie is not accessible via JavaScript
      secure: true, // In production, set secure to true to send the cookie over HTTPS only
      sameSite: "none", // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiry set to one day
    });

    return res.status(200).send({
      uid: userRecord.uid,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(401).json({ error: (error as Error).message });
  }
});

export default router;
