import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minLength: [3, "First name must be at least 3 characters"],
    maxLength: [30, "First name cannot exceed 30 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [3, "Last name must be at least 3 characters"],
    maxLength: [30, "Last name cannot exceed 30 characters"],
  },
  date: {
    type: String,
    required: [true, "Date is required"],
  },
  time: {
    type: String,
    required: [true, "Time is required"],
    validate: {
      validator: function (value) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(value)) return false;

        const [hours, minutes] = value.split(":").map(Number);
        return (
          (hours > 10 || (hours === 10 && minutes >= 0)) &&
          (hours < 22 || (hours === 22 && minutes === 0))
        );
      },
      message: "Time must be between 11:00 and 22:00 in HH:mm format",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Provide a valid email"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Phone number must contain exactly 10 digits",
    },
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);