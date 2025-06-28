import ErrorHandler from "../utils/errorHandler.js";
import { Reservation } from "../models/reservation.js";

const send_reservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please fill out the full reservation form!", 400));
  }

  try {
    const reservation = await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Reservation sent successfully!",
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};

export default send_reservation;