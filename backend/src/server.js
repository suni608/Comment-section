import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: "http://localhost:3000", // allow your frontend
  credentials: true
}));

app.use(express.json());

app.use("/api/comments", commentRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));
