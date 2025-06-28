import express from "express";
import send_reservation from "../controller/reservationController.js";
import { validateReservation } from "../middlewares/validationMiddleware.js";
import rateLimit from "express-rate-limit";

const reservationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many reservation attempts from this IP. Please try again later.",
});

const router = express.Router();

router.post("/send", reservationLimiter, validateReservation, send_reservation);

export default router;