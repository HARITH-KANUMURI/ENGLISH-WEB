const { v4: uuid } = require("uuid");

exports.getUserId = (req) => {
  return req.headers["x-user-id"] || uuid();
};
