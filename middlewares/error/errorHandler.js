// middlewares/validation/errorHandler.js
// const handleUnexpectedErrors = (err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: "Internal Server Error" });
// };

// const handleKnownErrors = (err, req, res, next) => {
//   // Check if it's a known error with a custom message
//   if (err.message) {
//     return res.status(err.status || 500).json({ error: err.message });
//   }

//   // For unexpected errors, log the details
//   console.error(err);

//   // Send a generic error message to the user
//   res.status(500).json({ error: "Internal Server Error" });
// };

// module.exports = { handleUnexpectedErrors, handleKnownErrors };
// errorHandler.js
const handleErrors = (err, req, res, next) => {
  // Log the error details
  console.error(err);

  // Check if it's a known error with a custom message
  if (err.status && err.message) {
    return res.status(err.status).json({ error: err.message });
  }

  // For unexpected errors, send a generic error message to the user
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = { handleErrors };
//It receives the error (err), request (req), response (res), and next middleware function as parameters.
//It logs the error details to the console.
//It checks if the error has a status property and a message property. If so, it sends a JSON response with the error status and message.
//If the error doesn't have both status and message properties, it sends a generic "Internal Server Error" message with a status code of 500.
