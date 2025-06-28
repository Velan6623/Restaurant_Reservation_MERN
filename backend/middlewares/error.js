import ErrorHandler from "../utils/errorHandler.js"; // Ensure this is defined or imported

const errorMiddleware = (err, req, res, next) => {
  console.error("Error middleware triggered:", err); // Debugging

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle Mongoose ValidationError
  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.errors).map((error) => error.message);
    const message = `Invalid input data: ${validationErrors.join(", ")}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle MongoServerError (e.g., duplicate key error)
  if (err.code === 11000) {
    const message = `Duplicate field value entered: ${Object.keys(err.keyValue).join(", ")}`;
    err = new ErrorHandler(message, 400);
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please log in again.";
    err = new ErrorHandler(message, 401);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Your token has expired. Please log in again.";
    err = new ErrorHandler(message, 401);
  }

  // Send error response
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;