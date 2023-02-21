const jwt = require('jsonwebtoken');

const userFromToken = (req) => {
  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
 };

module.exports = userFromToken;
