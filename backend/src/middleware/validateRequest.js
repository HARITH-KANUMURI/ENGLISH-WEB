/**
 * Generic request body validator middleware
 *
 * Usage:
 *   validateRequest(["field1", "field2"])
 *
 * Example:
 *   router.post(
 *     "/submit",
 *     validateRequest(["questionId", "selectedAnswer", "correctAnswer", "topic"]),
 *     controller.submit
 *   );
 */

module.exports = function validateRequest(requiredFields = []) {
  return function (req, res, next) {
    // Ensure body exists
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        error: "Request body is missing or invalid",
      });
    }

    // Check required fields
    for (const field of requiredFields) {
      if (
        req.body[field] === undefined ||
        req.body[field] === null ||
        req.body[field] === ""
      ) {
        return res.status(400).json({
          error: `Missing or empty required field: ${field}`,
        });
      }
    }

    next();
  };
};
