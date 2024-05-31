// middlewares/validation/errorHandler.js
const handleUnexpectedErrors = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
};

const handleKnownErrors = (err, req, res, next) => {
  // Check if it's a known error with a custom message
  if (err.message) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  // For unexpected errors, log the details
  console.error(err);

  // Send a generic error message to the user
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = { handleUnexpectedErrors, handleKnownErrors };
