import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";
import reservationRoute from "./routes/reservationRoute.js";
import errorMiddleware from "./middlewares/error.js"; // Import errorMiddleware

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
dbConnection();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/v1/reservation", reservationRoute);

// Error handling middleware
app.use(errorMiddleware); // Use errorMiddleware here

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));