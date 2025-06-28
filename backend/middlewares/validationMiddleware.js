import { body, validationResult } from "express-validator";

export const validateReservation = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("First name must be between 3 and 30 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Last name must be between 3 and 30 characters"),
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("date")
  .notEmpty()
  .withMessage("Date is required")
  .isISO8601()
  .withMessage("Please enter a valid date")
  .custom((value) => {
    const today = new Date().toISOString().split("T")[0];
    if (value < today) {
      throw new Error("Date cannot be in the past");
    }
    return true;
  }),
  body("time")
    .notEmpty()
    .withMessage("Time is required")
    .custom((value) => {
      const [hours, minutes] = value.split(":").map(Number);
      if (hours < 11 || (hours === 22 && minutes > 0) || hours > 22) {
        throw new Error("Time must be between 11:00 and 22:00");
      }
      return true;
    }),
  body("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must contain 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain only digits"),
  body("guests")
    .isInt({ min: 1, max: 20 })
    .withMessage("Guests must be between 1 and 20"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({ field: err.param, message: err.msg })),
      });
    }
    next();
  },
];