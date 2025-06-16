import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db";
import aiRoutes from "./routes/aiRoutes";
import authRoutes from "./routes/authRoutes";
import snippetRoutes from "./routes/snippetRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Code World is running");
});

app.use("/api/snippets", snippetRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running at port ${PORT}`));
