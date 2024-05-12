import express from "express";
import cors from "cors";
import bobaRoutes from "./routes/bobaRoutes";
import authRoutes from "./routes/authRoutes";
import userProfileRoutes from "./routes/userProfileRoutes";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/boba", bobaRoutes);
app.use("/api/userprofile", userProfileRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
