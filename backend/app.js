import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./middlewares/error.js"; // Correct import
import reservationRouter from "./routes/reservationRoute.js";
import dbConnection from "./database/dbConnection.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Database connection
dbConnection();

// CORS configuration
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);

// Health check route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN",
  });
});
app.post('/reservation/send', (req, res) => {
  res.json({ message: "Reservation successful" });
});

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Middleware
app.use(errorMiddleware);

export default app;