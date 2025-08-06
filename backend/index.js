import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use default 5000 if PORT is undefined

// Middleware
app.use(express.json({ limit: "10mb" })); // Increase payload size
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); // Fixed missing '/'

// Connect to DB before starting server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
}).catch((err) => {
  console.error("Database connection failed:", err);
  process.exit(1); // Exit process if DB connection fails
});
