// 404 Not Found handler
export const notFoundErrorHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set status code to 404
  next(error); // Pass the error to the error handler
};

// General error handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Set status code (500 if no specific error status)
  res.status(statusCode);
  res.json({
    message: err.message, // Send error message
    stack: process.env.NODE_ENV === "production" ? "" : err.stack, // Include stack trace only in non-production
  });
};
